import { FC, Fragment, useLayoutEffect } from "react"
import Cell from "./Cell"
import { useActions, useAppSelector } from "../hooks/reduxHooks"
import { Color, FigureType, MoveType, PositionDto } from "../generated/api"
import {
  useCreateSessionMutation,
  useLazyGetSessionQuery,
  useMakeMoveMutation,
} from "../API/chessApi"
import { updateSession } from "../store/reducers/CellsSlice"
import { selectedCellSelector } from "../store/selectors"

const Board: FC = () => {
  const cells = useAppSelector((state) => state.cells)
  const selectedCell = useAppSelector(selectedCellSelector)
  const { setSelectedCell, highlightMoves } = useActions()

  const id = "70a4025e-e576-4d71-891b-5c8727f2aef4"

  const [getSession] = useLazyGetSessionQuery()

  const [makeMove] = useMakeMoveMutation()

  const clickHandler = (position: PositionDto) => {
    setSelectedCell(position)

    highlightMoves({ x: position.x, y: position.y })

    if (cells.cells[position.y][position.x].available) {
      const indexId = cells.moves.findIndex(
        (move) =>
          move.figure.position.x === position.x &&
          move.figure.position.y &&
          position.y
      )
      makeMove({
        id,
        moveId: cells.moves[indexId].id,
      })

      setSelectedCell(null)
    }
  }

  useLayoutEffect(() => {
    getSession(id)
  }, [])

  return (
    <div className="board">
      {cells.cells.map((row, index) => (
        <Fragment key={index}>
          {row.map((cell) => (
            <Cell
              key={JSON.stringify(cell.position)}
              {...cell}
              clickHandler={clickHandler}
            />
          ))}
        </Fragment>
      ))}
    </div>
  )
}

export default Board
