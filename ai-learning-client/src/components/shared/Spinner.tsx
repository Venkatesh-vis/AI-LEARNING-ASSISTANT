type SpinnerProps = {
  size?: number;
};

const Spinner = ({
  size = 40,
}: SpinnerProps) => {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        gap-4
        py-12
      "
    >
      <div
        className="
          rounded-full
          border-4
          border-slate-200
          border-t-emerald-500
          animate-spin
        "
        style={{
          width: size,
          height: size,
        }}
      />
    </div>
  );
};

export default Spinner;