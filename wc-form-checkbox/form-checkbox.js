class CustomCheckbox extends HTMLElement {
  static formAssociated = true;

  constructor() {
      super();
      this.internals = this.attachInternals();
      this.checked = false; // Initial state
  }

  static get observedAttributes() {
      return ['checked', 'value']; // Observe 'checked' and 'value' attributes
  }

  get checked() {
      return this.hasAttribute('checked');
  }

  set checked(value) {
      if (value) {
          this.setAttribute('checked', '');
      } else {
          this.removeAttribute('checked');
      }
      // Set form value based on the value attribute or fallback to 'defaultCheckedValue' if not present
      const formValue = this.checked ? this.getAttribute('value') || 'defaultCheckedValue' : null;
      this.internals.setFormValue(formValue);
  }

  connectedCallback() {
      this.render(); // Render UI
      this.updateAppearance(); // Set initial appearance
  }

  attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'checked') {
          this.updateAppearance(); // Update appearance when checked state changes
      }
  }

  render() {
      // Create a shadow root
      const shadow = this.attachShadow({ mode: 'open' });

      // Create a link element to load external CSS
      const link = document.createElement('link');
      link.setAttribute('rel', 'stylesheet');
      link.setAttribute('href', './wc-form-checkbox/form-checkbox.css'); // Path to CSS file

      // Create elements
      const label = document.createElement('label');
      label.classList.add('custom-checkbox');

      const box = document.createElement('div');
      box.classList.add('box');

      const checkmark = document.createElement('span');
      checkmark.classList.add('checkmark');
      checkmark.textContent = '✔';

      const labelText = document.createElement('span');
      labelText.classList.add('label');

      // Create a slot for custom label text
      const slot = document.createElement('slot');

      // Append elements
      box.appendChild(checkmark);
      labelText.appendChild(slot); // Append the slot to the label text
      label.appendChild(box);
      label.appendChild(labelText);

      // Clear previous content and append new elements to shadow DOM
      shadow.innerHTML = ''; // Clear existing content in shadow DOM
      shadow.appendChild(link);
      shadow.appendChild(label);

      // Add click event to toggle checked state
      label.addEventListener('click', () => {
          this.checked = !this.checked; // Toggle checked state
          this.updateAppearance(); // Update appearance on click
          this.internals.setFormValue(this.checked ? this.getAttribute('value') || 'defaultCheckedValue' : null); // Update form value on click
      });
  }

  updateAppearance() {
     const box = this.shadowRoot.querySelector('.box'); // Use shadowRoot to access elements

     if (box) { // Check if box exists before accessing classList
         if (this.checked) {
             box.classList.add('checked');
         } else {
             box.classList.remove('checked');
         }
     } else {
         console.error("Box element not found in shadow root.");
     }
  }
}

customElements.define('custom-checkbox', CustomCheckbox);