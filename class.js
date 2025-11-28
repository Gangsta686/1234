// Базовый класс
class Animal {
    #privateName; // Приватное поле (ES2022+)

    constructor(name) {
        this.#privateName = name;
    }

    // Публичный метод, который использует приватный метод
    getName() {
        return this.#getPrivateName();
    }

    // Приватный метод
    #getPrivateName() {
        return this.#privateName;
    }

    // Абстрактный метод (в JavaScript нет настоящих абстрактных методов, но можно эмулировать)
    makeSound() {
        throw new Error("Метод makeSound() должен быть переопределён в дочернем классе");
    }

    // Статический метод
    static info() {
        return "Это базовый класс для всех животных";
    }
}

// Класс-наследник 1
class Mammal extends Animal {
    constructor(name, warmBlooded = true) {
        super(name);
        this.warmBlooded = warmBlooded;
    }

    // Переопределение родительского метода — полиморфизм
    makeSound() {
        return `${this.getName()} издаёт звук (млекопитающее)`;
    }

    // Приватный метод
    #isWarmBlooded() {
        return this.warmBlooded;
    }

    // Публичный метод, использующий приватный
    getWarmBloodedStatus() {
        return this.#isWarmBlooded() ? "теплокровное" : "холоднокровное";
    }

    // Статический метод
    static mammalFact() {
        return "Все млекопитающие вскармливают детёнышей молоком";
    }
}

// Класс-наследник 2
class Dog extends Mammal {
    constructor(name, breed) {
        super(name);
        this.breed = breed;
    }

    // Полиморфизм: переопределяем makeSound
    makeSound() {
        return `${this.getName()} говорит: Гав-гав!`;
    }

    // Приватный метод
    #getBreedInfo() {
        return `Порода: ${this.breed}`;
    }

    getDogInfo() {
        return `${this.getName()}, ${this.#getBreedInfo()}, ${this.getWarmBloodedStatus()}`;
    }

    // Статический метод
    static dogFact() {
        return "Собаки — лучшие друзья человека";
    }
}

// Класс-наследник 3
class Bulldog extends Dog {
    constructor(name) {
        super(name, "Бульдог");
    }

    // Полиморфизм: ещё одно переопределение
    makeSound() {
        return `${this.getName()} громко храпит: Хррр-гав!`;
    }

    // Приватный метод
    #sleepsALot() {
        return true;
    }

    isLazy() {
        return this.#sleepsALot() ? "Ленивый бульдог" : "Активный бульдог";
    }

    // Статический метод
    static bulldogFact() {
        return "Бульдоги известны своим упрямством и спокойствием";
    }
}

// Демонстрация цепочки наследования и полиморфизма
const animals = [
    new Animal("Абстрактное животное"), // Вызовет ошибку при вызове makeSound
    new Mammal("Кенгуру"),
    new Dog("Рекс", "Овчарка"),
    new Bulldog("Бруно")
];

// Пример полиморфизма
animals.slice(1).forEach(animal => {
    console.log(animal.makeSound()); // Каждый объект вызывает свой вариант метода
});

// Примеры вызова статических методов
console.log(Animal.info());
console.log(Mammal.mammalFact());
console.log(Dog.dogFact());
console.log(Bulldog.bulldogFact());

// Примеры вызова методов с приватной логикой
const bulldog = new Bulldog("Чарли");
console.log(bulldog.getDogInfo()); // Использует приватный метод в Dog и наследуемый в Animal
console.log(bulldog.isLazy());     // Использует приватный метод в Bulldog 