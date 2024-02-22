import "./SymbolList.css";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";

const SymbolList = ({
  symbols,
  header,
  selectedSymbolId,
  setSelectedSymbols,
}) => {
  return (
    <div className="symbol-list">
      {symbols.map((symbol) => (
        <Card
          key={`${header}-${symbol.id}`}
          onClick={() => {
            setSelectedSymbols((selectedSymbols) => ({
              ...selectedSymbols,
              [header]: symbol.id,
            }));
          }}
          sx={{
            maxWidth: 40,
            border:
              selectedSymbolId === symbol.id
                ? "2px solid blue"
                : "1px solid grey",
          }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="40"
              image={symbol.url}
              alt={symbol.alt}
            />
          </CardActionArea>
        </Card>
      ))}
    </div>
  );
};

export default SymbolList;








