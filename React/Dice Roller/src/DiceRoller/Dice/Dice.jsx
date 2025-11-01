const randomDice = () => {
  return Math.ceil(Math.random() * 6);
};

export default function Dice() {
  const dice = randomDice();
  return (
    <img src={`/images/dice-six-faces-${dice}.svg`} alt={`Dice-${dice}`} />
  );
}
