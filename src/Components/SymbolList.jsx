import "./SymbolList.css";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";

const SymbolList = ({ symbols, selectedSymbolId, setSelectedSymbols }) => {
  return (
    <div className="symbol-list">
      {symbols.map((symbol) => (
        <Card key={symbol.id} sx={{ maxWidth: 40 }}>
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
