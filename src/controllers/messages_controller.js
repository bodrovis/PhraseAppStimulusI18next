import { Controller } from "stimulus"
import { localize } from '../i18n/config'

export default class extends Controller {
  connect() {
    this.loadMessages()
  }

  loadMessages() {
    fetch(`${this.data.get("url")}.json`)
    .then(response => response.text())
    .then(json => {
      this.renderMessages(json)
      this.applyLocalization()
    })
  }

  renderMessages(raw_messages) {
    const messages = JSON.parse(raw_messages)
    let content = `<p data-i18n="messages_count" i18n-options="{ 'count': ${messages.length} }"></p>`
    messages.forEach((msg) => {
      content += `<div class="message"><strong>${msg.topic}</strong><br>${msg.body}</div>`
    })
    this.element.innerHTML = content
  }

  applyLocalization() {
    localize('.messages')
  }
}
