let customCheckboxes = document.querySelectorAll(".productCheckbox");

console.log("Event listeners are being set up.");

customCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", (event) => {
    console.log(event);
    console.log("checkbox changed");
  });
});

/* if (customOderCheckbox) {
  console.log(customOderCheckbox);

  customOderCheckbox.addEventListener("change", (event) => {
    console.log(event);
  });
} else {
  console.error("Checkbox element not found");
}
 */
