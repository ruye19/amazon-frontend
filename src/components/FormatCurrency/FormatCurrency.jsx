import numeral from "numeral";
import React from "react";

const FormatCurrency = ({amount}) => {
    const formatted = numeral(amount).format('$0,0.00');
    return <span>{formatted}</span>;
}
export default FormatCurrency;