interface H1Props {
  text: string;
}

export const H1 = ({ text }: H1Props) => {
  return (
    <h1 className="inline-block font-normal text-2xl text-[#333] p-2.5 capitalize">
      {text}
    </h1>
  );
};
