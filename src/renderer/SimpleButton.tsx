export default function BTon(props: any) {
  return (
    <button
      id="but"
      onClick={() => {
        console.log(props.hello);
      }}>
      Hello
    </button>
  );
}
