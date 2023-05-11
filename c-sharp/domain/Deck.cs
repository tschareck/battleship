using System.Collections.Generic;

public class Deck
{
  public int x;
  public int y;
  public bool isHit;

  public Deck(int x, int y)
  {
    this.x = x;
    this.y = y;
    this.isHit = false;
  }
}

public class Ship : List<Deck> { }