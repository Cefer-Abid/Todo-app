export const toggleIcon = function (el, style) {
  el.style.background = style;
};

// Checkbox border hover
export const hoverCheckboxBorder = function (e, style) {
  if (!e.target.closest(".checkbox")) return;
  toggleIcon(e.target.closest(".checkbox--border"), style);
};
