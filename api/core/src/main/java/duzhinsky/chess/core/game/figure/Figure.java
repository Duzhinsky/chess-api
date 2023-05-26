package duzhinsky.chess.core.game.figure;

import duzhinsky.chess.core.game.Board;
import duzhinsky.chess.core.game.Color;
import duzhinsky.chess.core.game.Position;
import duzhinsky.chess.core.game.move.Move;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Figure {

    private Position position;

    private Color color;

    private FigureType type;

    private int lastMoveIteration;

    private static int NOT_MOVED = -1;

    public Figure(FigureType type) {
        this.type = type;
    }

    public Figure(Position position, Color color, FigureType type) {
        this(position, color, type, NOT_MOVED);
    }

    public boolean isFirstMove() {
        return lastMoveIteration == NOT_MOVED;
    }

    public List<Move> getPossibleMoves(Board board) {
        return type.getProcessor().getPossibleMoves(this, board);
    }

    public static Figure pawn(Position position, Color color) {
        return new Figure(position, color, FigureType.PAWN);
    }
}
