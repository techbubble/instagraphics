// Instagraphic for Google Slides and Google Docs (card-based Google
// Workspace add-on; no HtmlService sidebar, so no script.container.ui scope).
//
// The side panel lists the user's graphics from instagraphic.app with Insert
// buttons. "New graphic" opens the site in a window, signed in as the same
// Google account; closing that window refreshes the list.
//
// Calls to the site carry the user's Google ID token
// (ScriptApp.getIdentityToken, scopes openid + userinfo.email); the site
// checks it was issued to this add-on (GOOGLE_ADDON_CLIENT_IDS).

var BASE_URL = "https://www.instagraphic.app";

function onHomepage(e) {
  return buildHome_(e && e.hostApp);
}

function onRefresh(e) {
  return navUpdate_(buildHome_(e.hostApp));
}

function onInsert(e) {
  var id = e.parameters.id;
  var format = e.parameters.format === "gif" ? "gif" : "png";
  var res = api_("post", "/api/addon/insert", { id: Number(id), format: format });
  var code = res.getResponseCode();
  if (code === 402) return notify_("Out of credits. Click Buy credits.");
  if (code === 401) return notify_("Sign-in failed. Reload the add-on.");
  if (code !== 200) return notify_("Could not get the image (" + code + ").");

  var title = decodeURIComponent(res.getHeaders()["X-Title"] || res.getHeaders()["x-title"] || "graphic");
  var blob = res.getBlob().setName(title + "." + format);
  try {
    if (e.hostApp === "docs") insertIntoDocs_(blob);
    else insertIntoSlides_(blob);
  } catch (err) {
    return notify_("Insert failed: " + err.message);
  }
  return CardService.newActionResponseBuilder()
    .setNotification(CardService.newNotification().setText("Inserted."))
    .setNavigation(CardService.newNavigation().updateCard(buildHome_(e.hostApp)))
    .build();
}

// Prints this project's OAuth client ID, the value for
// GOOGLE_ADDON_CLIENT_IDS on the site. Run it from the script editor.
function showClientId() {
  var token = ScriptApp.getIdentityToken();
  if (!token) throw new Error("No identity token. appsscript.json must list the openid and userinfo.email scopes.");
  var part = token.split(".")[1];
  var json = Utilities.newBlob(Utilities.base64DecodeWebSafe(part + "===".slice((part.length + 3) % 4))).getDataAsString();
  Logger.log("GOOGLE_ADDON_CLIENT_IDS=" + JSON.parse(json).aud);
}

// ---------------------------------------------------------------- cards

function buildHome_(hostApp) {
  var card = CardService.newCardBuilder();
  var res;
  try {
    res = api_("get", "/api/addon/graphics");
  } catch (err) {
    return messageCard_("Could not reach Instagraphic. " + err.message);
  }
  if (res.getResponseCode() !== 200) {
    return messageCard_("Could not sign in to Instagraphic (" + res.getResponseCode() + ").");
  }
  var data = JSON.parse(res.getContentText());

  card.setHeader(
    CardService.newCardHeader()
      .setTitle("Instagraphic")
      .setSubtitle(data.credits + (data.credits === 1 ? " credit" : " credits"))
  );

  var top = CardService.newCardSection()
    .addWidget(
      CardService.newButtonSet()
        .addButton(
          CardService.newTextButton()
            .setText("New graphic")
            .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
            .setOpenLink(openLink_(data.openUrl, "/"))
        )
        .addButton(
          CardService.newTextButton()
            .setText("Refresh")
            .setOnClickAction(CardService.newAction().setFunctionName("onRefresh"))
        )
        .addButton(CardService.newTextButton().setText("Buy credits").setOpenLink(openLink_(data.openUrl, "/credits")))
    );
  if (!data.graphics.length) {
    top.addWidget(
      CardService.newTextParagraph().setText(
        "No graphics yet. Click New graphic, make one and click Save, then close that window. It appears here, ready to insert."
      )
    );
  }
  card.addSection(top);

  var where = hostApp === "docs" ? "at the cursor" : "on the current slide";
  data.graphics.forEach(function (g) {
    var section = CardService.newCardSection()
      .setHeader(escape_(g.title))
      .addWidget(CardService.newImage().setImageUrl(g.thumb).setAltText(g.title))
      .addWidget(
        CardService.newButtonSet()
          .addButton(insertButton_("Insert image", g.id, "png"))
          .addButton(insertButton_("Insert GIF", g.id, "gif"))
      );
    if (!g.paid) {
      section.addWidget(CardService.newTextParagraph().setText("First insert uses 1 credit, then it's free."));
    }
    card.addSection(section);
  });
  card.addSection(
    CardService.newCardSection().addWidget(
      CardService.newTextParagraph().setText("Images are inserted " + where + ".")
    )
  );
  return card.build();
}

function insertButton_(label, id, format) {
  return CardService.newTextButton()
    .setText(label)
    .setOnClickAction(
      CardService.newAction()
        .setFunctionName("onInsert")
        .setParameters({ id: String(id), format: format })
        .setLoadIndicator(CardService.LoadIndicator.SPINNER)
    );
}

function openLink_(openUrl, path) {
  return CardService.newOpenLink()
    .setUrl(openUrl + "&next=" + encodeURIComponent(path))
    .setOpenAs(CardService.OpenAs.OVERLAY)
    .setOnClose(CardService.OnClose.RELOAD);
}

function messageCard_(text) {
  return CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader().setTitle("Instagraphic"))
    .addSection(
      CardService.newCardSection()
        .addWidget(CardService.newTextParagraph().setText(escape_(text)))
        .addWidget(
          CardService.newTextButton()
            .setText("Try again")
            .setOnClickAction(CardService.newAction().setFunctionName("onRefresh"))
        )
    )
    .build();
}

function notify_(text) {
  return CardService.newActionResponseBuilder()
    .setNotification(CardService.newNotification().setText(text))
    .build();
}

function navUpdate_(card) {
  return CardService.newActionResponseBuilder()
    .setNavigation(CardService.newNavigation().updateCard(card))
    .build();
}

function escape_(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// ---------------------------------------------------------------- site API

function api_(method, path, body) {
  // Google's consent screen lets users untick scopes; if any is missing,
  // stop here and show the authorization prompt again.
  ScriptApp.requireAllScopes(ScriptApp.AuthMode.FULL);
  var token = ScriptApp.getIdentityToken();
  if (!token) throw new Error("No Google identity token.");
  var opts = {
    method: method,
    headers: { Authorization: "Bearer " + token },
    muteHttpExceptions: true,
  };
  if (body) {
    opts.contentType = "application/json";
    opts.payload = JSON.stringify(body);
  }
  return UrlFetchApp.fetch(BASE_URL + path, opts);
}

// ---------------------------------------------------------------- insert

// Current slide (or the first), scaled to fit 80% of the page, centered.
function insertIntoSlides_(blob) {
  var pres = SlidesApp.getActivePresentation();
  var page = null;
  try {
    page = pres.getSelection().getCurrentPage();
  } catch (e) {
    page = null;
  }
  if (!page) {
    var slides = pres.getSlides();
    page = slides.length ? slides[0] : pres.appendSlide();
  }
  var img = page.insertImage(blob);
  var pw = pres.getPageWidth();
  var ph = pres.getPageHeight();
  var w = img.getWidth();
  var h = img.getHeight();
  var scale = Math.min((pw * 0.8) / w, (ph * 0.8) / h, 1);
  img.setWidth(w * scale).setHeight(h * scale);
  img.setLeft((pw - w * scale) / 2).setTop((ph - h * scale) / 2);
}

// At the cursor if there is one, otherwise at the end; no wider than the
// text column.
function insertIntoDocs_(blob) {
  var doc = DocumentApp.getActiveDocument();
  var img = null;
  try {
    var cursor = doc.getCursor();
    if (cursor) img = cursor.insertInlineImage(blob);
  } catch (e) {
    img = null;
  }
  if (!img) img = doc.getBody().appendParagraph("").appendInlineImage(blob);
  var body = doc.getBody();
  var maxW = body.getPageWidth() - body.getMarginLeft() - body.getMarginRight();
  var w = img.getWidth();
  if (w > maxW) {
    img.setHeight(Math.round((img.getHeight() * maxW) / w)).setWidth(Math.round(maxW));
  }
}
