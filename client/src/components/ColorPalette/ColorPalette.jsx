import "./colorPalette.styles.scss";
import colorData from "./colorData.json";
import { FaHeart } from "react-icons/fa";
import { useEffect } from "react";
import { BASE_URL } from "../../constants/constants";

// color palettes
const ColorPalette = ({ colors = colorData }) => {
  useEffect(() => {
    const getPalettes = async () => {
      const res = await fetch(`${BASE_URL}/api/palettes`);
      const data = await res.json();
      console.log({ data });
    };

    getPalettes();
  }, []);
  return (
    <div className="palette-wrapper">
      {colors?.map((item, index) => {
        return (
          <div key={index} className="palette-unit">
            <div className="colors-wrapper">
              {item.colors?.map((color, index) => {
                return (
                  <div
                    className="color-item"
                    key={index}
                    style={{ backgroundColor: color }}
                  >
                    {" "}
                  </div>
                  // end color-item
                );
              })}
            </div>
            {/* end colors-wraper */}

            <div className="text-wrapper">
              <span> {item.title} </span>
              <FaHeart className="icon" />
            </div>
          </div>
        );
      })}
    </div>
  );
  // end color-palette-wrapper
};

export default ColorPalette;
