class Bird implements fly, land {
  String name = 'crow';

  void bfly() {
    print('i can fly on sky');
  }

  void bland() {}
}

abstract class fly {
  String name = 'crow';
  void bfly() {}
}

class land {
  String name = 'crow';
  void bland() {}
}

void main() {
  final Bird b = Bird();
  b.bfly();
}
