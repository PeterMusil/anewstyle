import { initBeforeAfterSlider } from "./_beforeAfterSlider"
import { detectAvifSupport } from "./_detectAvifSupport"
import { initFancyBox } from "./_fancyBox"
import { initNav } from "./_nav"
import { initSplide } from "./_splitejs"

document.addEventListener("DOMContentLoaded", () => {
  detectAvifSupport()
  initSplide()
  initBeforeAfterSlider()
  initFancyBox()
  initNav()
})