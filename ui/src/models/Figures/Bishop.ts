import { Colors } from "../Colors"
import { Figure, FigureNames } from "./Figure"
import blackLogo from "../../figures/blackBishop.svg"
import whiteLogo from "../../figures/whiteBishop.svg"

export class Bishop extends Figure {
  constructor(color: Colors) {
    super(color)
    this.name = FigureNames.BISHOP
    this.icon = color === Colors.BLACK ? blackLogo : whiteLogo
  }
}
