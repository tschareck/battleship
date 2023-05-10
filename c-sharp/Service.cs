using System;
using System.Collections.Generic;

public class BattleService
{
    public FieldEnum[][] boardData = new FieldEnum[][] { };

    public List<string> history = new List<string>();

    public List<Ship> ships = new List<Ship>();

    public void NewGame()
    {
        history = new List<string>();
        ships = new List<Ship>();

        randomizeBoard();
    }

    public void ShotFired(int x, int y)
    {
        FieldEnum position = boardData[x][y];

        if (position == FieldEnum.Water)
        {
            setPosition(x, y, FieldEnum.Miss);
            pushHistory($"{BattleHelper.GetDescriptionFromCoord(x, y)} - Miss :(");
        }
        else if (position == FieldEnum.Ship)
        {
            setPosition(x, y, FieldEnum.Hit);
            pushHistory($"{BattleHelper.GetDescriptionFromCoord(x, y)} - Hit!");

            // mark hits in ships array
            for (int i = 0; i < ships.Count; i++)
            {
                for (int j = 0; j < ships[i].Count; j++)
                {
                    if (ships[i][j].x == x && ships[i][j].y == y)
                    {
                        ships[i][j].isHit = true;
                    }
                }
            }

            // check if sunk
            for (int targetRow = 0; targetRow < ships.Count; targetRow++)
            {
                bool allHit = true;
                for (int i = 0; i < ships[targetRow].Count; i++)
                {
                    if (ships[targetRow][i].isHit == false)
                    {
                        allHit = false;
                        break;
                    }
                }

                if (allHit)
                {
                    pushHistory("You've sunk my battleship !!!");
                    ships.RemoveAt(targetRow);
                    break;
                }
            }

            if (ships.Count == 0)
            {
                pushHistory("GAME OVER. You finished all my ships.");
            }
        }
    }

    public void ShotFiredByText(string inputValue)
    {
        int x = BattleHelper.GetIndexFromLetter(inputValue);
        int y = BattleHelper.GetIndexFromNumbers(inputValue);
        ShotFired(x, y);
    }

    void setPosition(int x, int y, FieldEnum field)
    {
        boardData[x][y] = field;
    }

    void randomizeBoard()
    {
        // new 10x10 board filled with water
        boardData = new FieldEnum[10][];
        for (int i = 0; i < 10; i++)
        {
            boardData[i] = new FieldEnum[10];
            for (int j = 0; j < 10; j++)
            {
                boardData[i][j] = FieldEnum.Water;
            }
        }

        // put battleship on random spot
        int startRow = new Random().Next(6);
        int startCol = new Random().Next(6);
        string direction = new Random().NextDouble() < 0.5 ? "horizontal" : "vertical";
        var battleship = new Ship();
        if (direction == "horizontal")
        {
            for (int i = 0; i < 5; i++)
            {
                boardData[startRow][startCol + i] = FieldEnum.Ship;
                battleship.Add(new Deck(startRow, startCol + i));
            }
        }
        else
        {
            for (int i = 0; i < 5; i++)
            {
                boardData[startRow + i][startCol] = FieldEnum.Ship;
                battleship.Add(new Deck(startRow + i, startCol));
            }
        }
        ships.Add(battleship);

        // put destroyer on random spot
        do
        {
            startRow = new Random().Next(7);
            startCol = new Random().Next(7);
            direction = new Random().NextDouble() < 0.5 ? "horizontal" : "vertical";
        } while (!isStartpointValid(startRow, startCol, direction));

        var destroyer1 = new Ship();
        if (direction == "horizontal")
        {
            for (int i = startCol; i < startCol + 4; i++)
            {
                boardData[startRow][i] = FieldEnum.Ship;
                destroyer1.Add(new Deck(startRow, i));
            }
        }
        else
        {
            for (int i = startRow; i < startRow + 4; i++)
            {
                boardData[i][startCol] = FieldEnum.Ship;
                destroyer1.Add(new Deck(i, startCol));
            }
        }
        ships.Add(destroyer1);

        // put another one
        do
        {
            startRow = new Random().Next(7);
            startCol = new Random().Next(7);
            direction = new Random().NextDouble() < 0.5 ? "horizontal" : "vertical";
        } while (!isStartpointValid(startRow, startCol, direction));

        var destroyer2 = new Ship();
        if (direction == "horizontal")
        {
            for (int i = startCol; i < startCol + 4; i++)
            {
                boardData[startRow][i] = FieldEnum.Ship;
                destroyer2.Add(new Deck(startRow, i));
            }
        }
        else
        {
            for (int i = startRow; i < startRow + 4; i++)
            {
                boardData[i][startCol] = FieldEnum.Ship;
                destroyer2.Add(new Deck(i, startCol));
            }
        }
        ships.Add(destroyer2);
    }

    bool isStartpointValid(int row, int col, string direction)
    {
        bool isValid = true;

        if (direction == "horizontal")
        {
            for (int i = col; i < col + 4; i++)
            {
                if (boardData[row][i] == FieldEnum.Ship)
                {
                    isValid = false;
                    break;
                }
            }
        }
        else
        {
            for (int i = row; i < row + 4; i++)
            {
                if (boardData[i][col] == FieldEnum.Ship)
                {
                    isValid = false;
                    break;
                }
            }
        }

        return isValid;
    }

    void pushHistory(string hist)
    {
        history.Add(hist);
    }
}