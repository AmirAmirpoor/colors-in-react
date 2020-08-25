import chroma from "chroma-js";

export const getAverageColor = (colors) => {
  const newColor = chroma.average(colors, "rgb")._rgb.slice(0, 3);
  return chroma(newColor).hex();
};

export const getShades = (color) => {
  const start = "#fff";
  const end = chroma(color).darken(2);

  const shades = chroma.scale([start, color, end]).mode("lch").colors(25);

  return shades;
};

export const copyToClipboard = (text) => {
  const el = document.createElement("textarea");
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};
