import "./colorPalette.styles.scss";
import colorData from "./colorData.json";

const ColorPalette = () => {
  console.log({ colorData });
  return (
    <div className="palette-wrapper">
      {colorData.map((item) => {
        return (
          <div key={item.id} className="palette-unit">
            {" "}
            {item.colors.map((i, index) => {
              return (
                <div
                  className="palette-item"
                  key={index}
                  style={{ backgroundColor: i }}
                >
                  {" "}
                </div>
              );
            })}{" "}
            <h3> {item.title} </h3>
          </div>
        );
      })}
    </div>
  );
};

export default ColorPalette;
