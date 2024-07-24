const PHISHING_OFF_HEADERS = [
  "X-PHISHTEST"
]

const PHISH_OFF_LABEL = "phish-off";

function phishOff() {
  let threads = GmailApp.search("newer_than:5h label:unread in:inbox");
  for (let thread of threads) {
    Logger.log("Thread " + thread.getFirstMessageSubject());
    let message = thread.getMessages()[0];

    let phishOff = PHISHING_OFF_HEADERS
      .map(headerName => message.getHeader(headerName))
      .some(x => x);

    if (phishOff) {
      Logger.log("Phish-off: " + message.getSubject());
      label(thread);
    }
  }
}

/**
 *  @param {GmailApp.GmailThread} thread 
 */
function label(thread) {
  let label = GmailApp.getUserLabelByName(PHISH_OFF_LABEL) || GmailApp.createLabel(PHISH_OFF_LABEL);
  thread.addLabel(label);
  thread.moveToArchive();
}
