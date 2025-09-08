import "./colorPalette.styles.scss";
import colorData from "./colorData.json";
import { FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../constants/constants";
import Spinner from "../Spinner/Spinner";

// color palettes
const ColorPalette = () => {
  const [colors, setColors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getPalettes = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/api/palettes`);
        if (!res.ok) {
          throw new Error("something went wrong");
        }
        const data = await res.json();
        setColors(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    getPalettes();
  }, []);

  if (isLoading) return <Spinner />;
  return (
    <div className="palette-wrapper">
      {colors &&
        colors.length > 0 &&
        colors?.map((item, index) => {
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
