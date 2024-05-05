import clsx from "clsx";

const Price = ({
  amount,
  className,
  currencyCode = "SEK",
}: {
  amount: string | number;
  className?: string;
  currencyCode?: string;
} & React.ComponentProps<"p">) => {
  return (
    <p suppressHydrationWarning={true} className={clsx(className)}>
      {`${new Intl.NumberFormat("sv-se", {
        style: "currency",
        currency: currencyCode,
        currencyDisplay: "narrowSymbol",
      }).format(parseFloat(amount.toString()))}`}
    </p>
  );
};

export default Price;
