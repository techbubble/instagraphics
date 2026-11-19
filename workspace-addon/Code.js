// Instagraphic editor add-on for Google Slides and Google Docs.
// The sidebar embeds the Instagraphic site; when the user clicks Insert there,
// the image comes back through the sidebar to insertImage() below.

var BASE_URL = "https://www.instagraphic.app";

// Slides or Docs. getUi() throws outside its own editor, and works in
// AuthMode.NONE, so this is safe inside onOpen.
function host_() {
  try {
    SlidesApp.getUi();
    return "slides";
  } catch (e) {
    return "docs";
  }
}

function ui_() {
  return host_() === "slides" ? SlidesApp.getUi() : DocumentApp.getUi();
}

function onOpen(e) {
  ui_().createAddonMenu().addItem("Open Instagraphic", "showSidebar").addToUi();
}

function onInstall(e) {
  onOpen(e);
}

function showSidebar() {
  var t = HtmlService.createTemplateFromFile("Sidebar");
  t.baseUrl = BASE_URL;
  var html = t.evaluate().setTitle("Instagraphic");
  ui_().showSidebar(html);
}

// Google-signed ID token (with the user's email) so the site can sign the
// user in with their Google account. Needs the openid and userinfo.email
// scopes in appsscript.json.
function getIdentityToken() {
  return ScriptApp.getIdentityToken();
}

// Called from the sidebar with a base64 PNG or GIF.
function insertImage(b64, mime, name) {
  if (mime !== "image/png" && mime !== "image/gif") {
    throw new Error("Unsupported image type.");
  }
  var blob = Utilities.newBlob(Utilities.base64Decode(b64), mime, name || "instagraphic");
  if (host_() === "slides") {
    insertIntoSlides_(blob);
  } else {
    insertIntoDocs_(blob);
  }
  return true;
}

// Places the image on the current slide, scaled to fit 80% of the slide
// and centered.
function insertIntoSlides_(blob) {
  var pres = SlidesApp.getActivePresentation();
  var page = pres.getSelection().getCurrentPage() || pres.getSlides()[0];
  if (!page) throw new Error("Add a slide first.");
  var img = page.insertImage(blob);
  var pw = pres.getPageWidth();
  var ph = pres.getPageHeight();
  var scale = Math.min((pw * 0.8) / img.getWidth(), (ph * 0.8) / img.getHeight(), 1);
  var w = img.getWidth() * scale;
  var h = img.getHeight() * scale;
  img.setWidth(w).setHeight(h).setLeft((pw - w) / 2).setTop((ph - h) / 2);
  img.select();
}

// Inserts the image at the cursor (or appends it), no wider than the text
// column.
function insertIntoDocs_(blob) {
  var doc = DocumentApp.getActiveDocument();
  var body = doc.getBody();
  var cursor = doc.getCursor();
  var img = cursor ? cursor.insertInlineImage(blob) : null;
  if (!img) img = body.appendImage(blob);
  var column = body.getPageWidth() - body.getMarginLeft() - body.getMarginRight();
  if (img.getWidth() > column) {
    var ratio = column / img.getWidth();
    img.setWidth(column).setHeight(img.getHeight() * ratio);
  }
}
