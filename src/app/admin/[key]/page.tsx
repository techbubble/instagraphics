import { timingSafeEqual } from "node:crypto";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sql } from "@/lib/db";
import { getTemplate } from "@/lib/templates";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

function keyMatches(given: string): boolean {
  const expected = process.env.ADMIN_KEY;
  if (!expected) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

const money = (cents: number) =>
  `$${(Number(cents) / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const num = (n: number | string) => Number(n).toLocaleString("en-US");
const when = (d: string) =>
  new Date(d).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
const tplName = (id: string) => getTemplate(id)?.title ?? id;

type Totals = {
  users: number; users_1d: number; users_7d: number; users_30d: number;
  active_7d: number;
  graphics: number; graphics_1d: number; graphics_7d: number;
  paid: number; paid_7d: number;
  downloads: number; downloads_7d: number;
  purchases: number; revenue: number; revenue_7d: number; revenue_30d: number; buyers: number;
  credits_sold: number; credits_outstanding: number;
  gifts: number; gift_credits: number;
  views: number;
};

export default async function AdminPage({ params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  if (!keyMatches(decodeURIComponent(key))) notFound();

  const db = sql();
  const [totalsRows, daily, templates, formats, recentUsers, recentPurchases, topCustomers] =
    await Promise.all([
      db`
        SELECT
          (SELECT count(*) FROM users)::int AS users,
          (SELECT count(*) FROM users WHERE created_at > now() - interval '1 day')::int AS users_1d,
          (SELECT count(*) FROM users WHERE created_at > now() - interval '7 days')::int AS users_7d,
          (SELECT count(*) FROM users WHERE created_at > now() - interval '30 days')::int AS users_30d,
          (SELECT count(DISTINCT user_id) FROM graphics WHERE created_at > now() - interval '7 days')::int AS active_7d,
          (SELECT count(*) FROM graphics)::int AS graphics,
          (SELECT count(*) FROM graphics WHERE created_at > now() - interval '1 day')::int AS graphics_1d,
          (SELECT count(*) FROM graphics WHERE created_at > now() - interval '7 days')::int AS graphics_7d,
          (SELECT count(*) FROM graphics WHERE paid_at IS NOT NULL)::int AS paid,
          (SELECT count(*) FROM graphics WHERE paid_at > now() - interval '7 days')::int AS paid_7d,
          (SELECT count(*) FROM downloads)::int AS downloads,
          (SELECT count(*) FROM downloads WHERE created_at > now() - interval '7 days')::int AS downloads_7d,
          (SELECT count(*) FROM purchases)::int AS purchases,
          (SELECT coalesce(sum(amount_cents), 0) FROM purchases)::bigint AS revenue,
          (SELECT coalesce(sum(amount_cents), 0) FROM purchases WHERE created_at > now() - interval '7 days')::bigint AS revenue_7d,
          (SELECT coalesce(sum(amount_cents), 0) FROM purchases WHERE created_at > now() - interval '30 days')::bigint AS revenue_30d,
          (SELECT count(DISTINCT user_id) FROM purchases)::int AS buyers,
          (SELECT coalesce(sum(credits), 0) FROM purchases)::bigint AS credits_sold,
          (SELECT coalesce(sum(credits), 0) FROM users)::bigint AS credits_outstanding,
          (SELECT count(*) FROM gifts)::int AS gifts,
          (SELECT coalesce(sum(credits), 0) FROM gifts)::bigint AS gift_credits,
          (SELECT coalesce(sum(views), 0) FROM template_views)::bigint AS views
      `,
      db`
        WITH days AS (
          SELECT generate_series(date_trunc('day', now()) - interval '29 days', date_trunc('day', now()), interval '1 day') AS day
        )
        SELECT
          to_char(d.day, 'YYYY-MM-DD') AS day,
          (SELECT count(*) FROM users u WHERE date_trunc('day', u.created_at) = d.day)::int AS signups,
          (SELECT count(*) FROM graphics g WHERE date_trunc('day', g.created_at) = d.day)::int AS graphics,
          (SELECT count(*) FROM graphics g WHERE date_trunc('day', g.paid_at) = d.day)::int AS paid,
          (SELECT count(*) FROM downloads x WHERE date_trunc('day', x.created_at) = d.day)::int AS downloads,
          (SELECT coalesce(sum(amount_cents), 0) FROM purchases p WHERE date_trunc('day', p.created_at) = d.day)::bigint AS revenue
        FROM days d
        ORDER BY d.day DESC
      `,
      db`
        SELECT t.template_id,
               coalesce(g.created, 0)::int AS created,
               coalesce(g.paid, 0)::int AS paid,
               coalesce(v.views, 0)::bigint AS views
        FROM (SELECT template_id FROM graphics UNION SELECT template_id FROM template_views) t
        LEFT JOIN (
          SELECT template_id, count(*) AS created, count(paid_at) AS paid FROM graphics GROUP BY template_id
        ) g USING (template_id)
        LEFT JOIN template_views v USING (template_id)
        ORDER BY created DESC, views DESC
        LIMIT 40
      `,
      db`SELECT format, count(*)::int AS n FROM downloads GROUP BY format ORDER BY n DESC`,
      db`
        SELECT u.id, u.email, u.name, u.credits, u.created_at,
               (SELECT count(*) FROM graphics g WHERE g.user_id = u.id)::int AS graphics,
               (SELECT count(*) FROM graphics g WHERE g.user_id = u.id AND g.paid_at IS NOT NULL)::int AS paid,
               (SELECT coalesce(sum(amount_cents), 0) FROM purchases p WHERE p.user_id = u.id)::bigint AS spent
        FROM users u
        ORDER BY u.created_at DESC
        LIMIT 50
      `,
      db`
        SELECT p.created_at, p.credits, p.amount_cents, u.email
        FROM purchases p JOIN users u ON u.id = p.user_id
        ORDER BY p.created_at DESC
        LIMIT 25
      `,
      db`
        SELECT u.email, count(*)::int AS orders, sum(p.amount_cents)::bigint AS spent, max(p.created_at) AS last_at
        FROM purchases p JOIN users u ON u.id = p.user_id
        GROUP BY u.email
        ORDER BY spent DESC
        LIMIT 15
      `,
    ]);

  const t = totalsRows[0] as Totals;
  const pct = (a: number, b: number) => (b ? `${((a / b) * 100).toFixed(1)}%` : "-");

  const kpis: [string, string, string][] = [
    ["Users", num(t.users), `+${num(t.users_1d)} 24h, +${num(t.users_7d)} 7d, +${num(t.users_30d)} 30d`],
    ["Active creators (7d)", num(t.active_7d), "distinct users who saved a graphic"],
    ["Graphics", num(t.graphics), `+${num(t.graphics_1d)} 24h, +${num(t.graphics_7d)} 7d`],
    ["Paid graphics", num(t.paid), `+${num(t.paid_7d)} 7d, ${pct(t.paid, t.graphics)} of saved`],
    ["Downloads", num(t.downloads), `+${num(t.downloads_7d)} 7d`],
    ["Revenue", money(t.revenue), `${money(t.revenue_7d)} 7d, ${money(t.revenue_30d)} 30d`],
    ["Purchases", num(t.purchases), `${num(t.buyers)} buyers, ${pct(t.buyers, t.users)} of users`],
    ["Credits", num(t.credits_outstanding), `outstanding; ${num(t.credits_sold)} sold`],
    ["Gifts", num(t.gifts), `${num(t.gift_credits)} credits gifted`],
    ["Template views", num(t.views), "builder opens"],
  ];

  return (
    <>
      <div className="d-flex align-items-baseline justify-content-between mb-4">
        <h1 className="h3 mb-0">Admin</h1>
        <span className="small text-secondary">as of {new Date().toUTCString()}</span>
      </div>

      <div className="row g-3 mb-5">
        {kpis.map(([label, value, sub]) => (
          <div key={label} className="col-6 col-md-4 col-lg-3">
            <div className="border rounded p-3 h-100">
              <div className="small text-secondary">{label}</div>
              <div className="fs-4 fw-semibold">{value}</div>
              <div className="small text-secondary">{sub}</div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="h5">Last 30 days (UTC)</h2>
      <div className="table-responsive mb-5">
        <table className="table table-sm table-hover">
          <thead>
            <tr><th>Day</th><th className="text-end">Signups</th><th className="text-end">Graphics</th><th className="text-end">Paid</th><th className="text-end">Downloads</th><th className="text-end">Revenue</th></tr>
          </thead>
          <tbody>
            {(daily as { day: string; signups: number; graphics: number; paid: number; downloads: number; revenue: number }[]).map((d) => (
              <tr key={d.day}>
                <td>{d.day}</td>
                <td className="text-end">{d.signups || ""}</td>
                <td className="text-end">{d.graphics || ""}</td>
                <td className="text-end">{d.paid || ""}</td>
                <td className="text-end">{d.downloads || ""}</td>
                <td className="text-end">{Number(d.revenue) ? money(d.revenue) : ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="row g-4 mb-5">
        <div className="col-lg-8">
          <h2 className="h5">Templates</h2>
          <div className="table-responsive">
            <table className="table table-sm table-hover">
              <thead>
                <tr><th>Template</th><th className="text-end">Views</th><th className="text-end">Saved</th><th className="text-end">Paid</th><th className="text-end">Paid / views</th></tr>
              </thead>
              <tbody>
                {(templates as { template_id: string; created: number; paid: number; views: number }[]).map((r) => (
                  <tr key={r.template_id}>
                    <td>{tplName(r.template_id)} <span className="small text-secondary">{r.template_id}</span></td>
                    <td className="text-end">{num(r.views)}</td>
                    <td className="text-end">{num(r.created)}</td>
                    <td className="text-end">{num(r.paid)}</td>
                    <td className="text-end">{pct(r.paid, Number(r.views))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-lg-4">
          <h2 className="h5">Download formats</h2>
          <table className="table table-sm mb-4">
            <tbody>
              {(formats as { format: string; n: number }[]).map((f) => (
                <tr key={f.format}><td>{f.format}</td><td className="text-end">{num(f.n)}</td></tr>
              ))}
            </tbody>
          </table>

          <h2 className="h5">Top customers</h2>
          <table className="table table-sm">
            <tbody>
              {(topCustomers as { email: string; orders: number; spent: number; last_at: string }[]).map((c) => (
                <tr key={c.email}>
                  <td className="text-break">{c.email}<div className="small text-secondary">{c.orders} orders, last {when(c.last_at)}</div></td>
                  <td className="text-end">{money(c.spent)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <h2 className="h5">Recent purchases</h2>
      <div className="table-responsive mb-5">
        <table className="table table-sm table-hover">
          <thead>
            <tr><th>When</th><th>Email</th><th className="text-end">Credits</th><th className="text-end">Amount</th></tr>
          </thead>
          <tbody>
            {(recentPurchases as { created_at: string; email: string; credits: number; amount_cents: number }[]).map((p, i) => (
              <tr key={i}>
                <td>{when(p.created_at)}</td>
                <td>{p.email}</td>
                <td className="text-end">{num(p.credits)}</td>
                <td className="text-end">{money(p.amount_cents)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="h5">Recent signups</h2>
      <div className="table-responsive">
        <table className="table table-sm table-hover">
          <thead>
            <tr><th>When</th><th>Email</th><th>Name</th><th className="text-end">Credits</th><th className="text-end">Graphics</th><th className="text-end">Paid</th><th className="text-end">Spent</th></tr>
          </thead>
          <tbody>
            {(recentUsers as { id: number; email: string; name: string; credits: number; created_at: string; graphics: number; paid: number; spent: number }[]).map((u) => (
              <tr key={u.id}>
                <td>{when(u.created_at)}</td>
                <td>{u.email}</td>
                <td>{u.name}</td>
                <td className="text-end">{num(u.credits)}</td>
                <td className="text-end">{num(u.graphics)}</td>
                <td className="text-end">{num(u.paid)}</td>
                <td className="text-end">{Number(u.spent) ? money(u.spent) : ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
