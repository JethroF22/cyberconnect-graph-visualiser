import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import {
  Transaction,
  ERC20Transfer,
  TransactionType,
} from "../types/etherscan";
import { formatErc20Value, convertToEth } from "../lib/transactions";

interface TransactionDetailsProps {
  transaction: Transaction;
  searchedAddress: string;
}

function TransactionDetails({
  transaction,
  searchedAddress,
}: TransactionDetailsProps) {
  return (
    <Box sx={{ width: "80%" }}>
      <Typography variant="caption" component="div">
        Hash: {transaction.hash}
      </Typography>
      <Typography variant="caption" component="div">
        Gas used: {transaction.gasUsed}
      </Typography>
      <Typography variant="caption" component="div">
        Gas price: {transaction.gasPrice}
      </Typography>
      {searchedAddress.toLowerCase() === transaction.from.toLowerCase() && (
        <Typography variant="caption">To: {transaction.to}</Typography>
      )}
      {searchedAddress.toLowerCase() === transaction.to.toLowerCase() && (
        <Typography variant="caption" component="div">
          From: {transaction.from}
        </Typography>
      )}
      {transaction.type === TransactionType.ERC20_TRANSFER && (
        <Typography variant="caption" component="div">
          Value: {formatErc20Value(transaction as ERC20Transfer).toString()}
          {(transaction as ERC20Transfer).tokenSymbol}
        </Typography>
      )}
      {transaction.type === TransactionType.STANDARD_TRANSACTION && (
        <Typography variant="caption" component="div">
          Value: {convertToEth(transaction.value)}ETH
        </Typography>
      )}
    </Box>
  );
}

export default TransactionDetails;
