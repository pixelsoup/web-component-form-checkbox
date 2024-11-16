class XCheckbox extends HTMLElement {
  static formAssociated = !0;
  static observedAttributes = ["checked", "value"];
  static template = document.createElement("template");
  static {
    this.template.innerHTML = '<span tabindex="0" aria-hidden="true"></span>'
  }
  #internals = this.attachInternals();
  #disabled = this.matches(":disabled");
  get #a() {
    return this.shadowRoot.querySelector("span")
  }
  get checked() {
    return this.hasAttribute("checked")
  }
  set checked(e) {
    this.toggleAttribute("checked", e)
  }
  get value() {
    return this.getAttribute("value") ?? "on"
  }
  set value(e) {
    this.setAttribute("value", e)
  }
  constructor() {
    super(), "role" in ElementInternals.prototype ? this.#internals.role = "checkbox" : this.setAttribute("role", "checkbox"), this.addEventListener("click", this.#c), this.addEventListener("keydown", this.#i),
    this.attachShadow({
      mode: "open"
    }).append(XCheckbox.template.content.cloneNode(!0));
    const e = new CSSStyleSheet;
    e.replaceSync(`
      :host(:disabled) span {
        opacity: 0.5;
        cursor: not-allowed;
      }
    `), this.shadowRoot.adoptedStyleSheets.push(e)
  }
  connectedCallback() {
    this.#internals.setFormValue(this.checked ? this.value : null), this.#a.textContent = this.checked ? "\u2705" : "\u274C", "ariaChecked" in ElementInternals.prototype ? this.#internals.ariaChecked = String(this.checked) : this.setAttribute("aria-checked", String(this.checked))
  }
  attributeChangedCallback(e, s, t) {
    switch (e) {
      case "checked":
        this.checked = t != null;
        break;
      case "value":
        t !== this.value && (this.value = t);
        break;
      case "required":
        t == null || this.checked ? this.#internals.setValidity({}) : this.#internals.setValidity({
          valueMissing: !0
        }, t || "Must check this box", this.#internals.form)
    }
    this.connectedCallback()
  }
  formAssociatedCallback(e) {
    console.log("formAssociatedCallback", e)
  }
  formDisabledCallback(e) {
    this.#disabled = e, console.log("formDisabledCallback", e)
  }
  formStateRestoreCallback(e) {
    console.log("formStateRestoreCallback", e)
  }
  formResetCallback(...e) {
    console.log("formResetCallback", ...e)
  }
  #c() {
    this.#disabled || this.#s()
  }
  #i(e) {
    switch (e.key) {
      case " ":
        e.preventDefault(), this.#s()
    }
  }
  #s() {
    this.checked = !this.checked
  }
}
customElements.define("x-checkbox", XCheckbox);