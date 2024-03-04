import { LocationSvg } from "../../../components/Zone/svg/LocationSvg";
import { DateSvg } from "../../../components/Zone/svg/DateSvg";
import { DaysSvg } from "../../../components/Zone/svg/DaysSvg";
import { TypeSvg } from "../../../components/Zone/svg/TypeSvg";
import { StageSvg } from "../../../components/Zone/svg/StageSvg";
import { Graphic } from "../Graphic/Graphic";
import { GraphicTime } from "../GraphicTime/GraphicTime";
import { Temperature } from "../svg/Temperature";
import { Humidity } from "../svg/Humidity";
import { HumidityLand } from "../svg/HumidtyLand";
import { Capacity, Droplet, Ripple } from "../svg/IconsWater";
import { useState, useEffect } from "react";
import { Socket, io } from "socket.io-client";
import "./ControlFarm.css";

export function ControlFarm({ name, location, type, stage, date, days }) {
  const [values, setValues] = useState({
    temperatura: 0,
    humedadAmbiente: 0,
    humedadSuelo: 0
  });

  useEffect(() => {
    const URL =
      process.env.NODE_ENV === "production"
        ? undefined
        : "http://localhost:3000";
    const socket = io(URL);
    socket.emit("appConnection", "12345");
    socket.on("dataDevice", (data) => {
      setValues(data);
    });
    return () => {
      socket.close();
    };
  }, []);

  return (
    <main className="controlFarm">
      <div className="general">
        <div className="img">
          <img src="../tomato.png" alt="" />
        </div>
        <div className="info">
          <p className="status active">Offline</p>
          <h1>{name}</h1>
          <div className="section location">
            <LocationSvg />
            <h2>{location}</h2>
          </div>
          <div className="section date">
            <DateSvg />
            <h2>
              <span>Inicio:</span> {date}
            </h2>
          </div>
          <div className="section days">
            <DaysSvg />
            <h2>
              <span>Edad: </span> {days} días
            </h2>
          </div>
          <div className="section type">
            <TypeSvg />
            <h2>
              <span>Variedad:</span> {type}
            </h2>
          </div>
          <div className="section stage">
            <StageSvg />
            <h2>
              <span>Etapa:</span> {stage}
            </h2>
          </div>
        </div>
      </div>
      <div>
        <div className="graphics">
          <div className="graphicOne">
            <Graphic
              color={"#e30224"}
              value={values.temperatura.toFixed(1) + "°C"}
              percentValue={values.temperatura * 2}
            />
            <div className="infoGraphic">
              <Temperature />
              <h2>Temperatura</h2>
            </div>
          </div>
          <div className="graphicOne">
            <Graphic
              color={"#6cbdb5"}
              value={Math.round(values.humedadAmbiente) + "%"}
              percentValue={Math.round(
                (values.humedadAmbiente - 20) * (10 / 7)
              )}
            />
            <div className="infoGraphic">
              <Humidity />
              <h2>Humedad</h2>
            </div>
          </div>
          <div className="graphicOne">
            <Graphic
              color={"#8fd053"}
              value={
                Math.round(((4095 - values.humedadSuelo) / 1595) * 100) + "%"
              }
              percentValue={Math.round(
                ((4095 - values.humedadSuelo) / 1595) * 100
              )}
            />
            <div className="infoGraphic">
              <HumidityLand />
              <h2>Humedad suelo</h2>
            </div>
          </div>
          <div className="graphicOne">
            <Graphic color={"#f2cd4f"} />
            <h2>Nivel de sol</h2>
          </div>
        </div>
      </div>
      <div className="registerData">
        <div className="graphicTime">
          <GraphicTime />
          <h2>Registro Temperatura</h2>
        </div>
        <div className="graphicTime">
          <GraphicTime />
          <h2>Registro Humedad</h2>
        </div>
        <div className="graphicTime">
          <div>
            <GraphicTime />
          </div>
          <h2>Registro Humedad Suelo</h2>
        </div>
      </div>
      <div>
        <h2 className="stageContainer">
          <span>Etapa:</span> Cotiledon
        </h2>
        <div className="imgEtapa">
          <img src="../cotiledon_etapa.png" alt="" />
        </div>
      </div>
      <div className="water">
        <div className="containerWater">
          <div></div>
        </div>
        <div className="irrigation">
          <h2>Detalles del riego</h2>
          <div className="waterDetails">
            <Capacity />
            <h3>
              Capacidad del contenedor:<span>10000L</span>
            </h3>
          </div>
          <div className="waterDetails">
            <Droplet />
            <h3>
              Contenido actual: <span>10000L</span>
            </h3>
          </div>
          <div className="waterDetails">
            <Ripple />
            <h3>
              Litros consumidos: <span>1500L</span>
            </h3>
          </div>
          <div className="waterDetails">
            <img src="/water_pump.svg" alt="" />
            <h3>
              Forma de riego: <span>Bomba de agua</span>
            </h3>
          </div>
        </div>
      </div>
      <div className="buttons">
        <button className="buttonControl">Regar</button>
        <button className="buttonControl">Desactivar riego automático</button>
        <button className="buttonControl">Activar ventilador</button>
      </div>
    </main>
  );
}
