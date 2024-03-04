import "./Control.css";
import { useState, useEffect } from "react";
import { Config } from "../svg/Config.jsx";
import { Logout } from "../svg/Logout.jsx";
import { Zone } from "../../../components/Zone/Zone.jsx";

export function Control() {
  
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    const data = () => {
      getCrops().then((crops) => {
        setCrops(crops);
      });
    };
    data();
  }, []);

  const getCrops = () => {
    return fetch("http://localhost:8000/api/getCrops", { method: "POST" }).then(
      (res) => {
        return res.json();
      }
    );
  };

  const handleLogout = () => {
    localStorage.clear();
  };

  const openForm = () => {
    document.querySelector(".formAdd").style.display = "flex";
  };

  const close = () => {
    document.querySelector(".formAdd").style.display = "none";
  };

  const createCrop = (e) => {
    e.preventDefault();
    const form = document.querySelector(".form");
    let data = new FormData(form);
    data.append("email", localStorage.getItem("email"));
    data.append("password", localStorage.getItem("password"));
    fetch("http://localhost:8000/api/addCrop", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "created") {
          form.submit();
        } else {
          const alert = document.querySelector(".falseValidation");
          alert.style.display = "flex";
          if (res.message === "id_not_exists") {
            alert.innerHTML = "⚠️ ID inválido";
          } else if (res.message === "already_exists") {
            alert.innerHTML = "⚠️ El ID ya ha sido registrado";
          } else {
            alert.innerHTML = res.message;
          }
        }
      });
  };

  const setDate = (date) => {
    const parts = date.split(" ");
    const dateFinal = parts[0];
    const [year, month, day] = dateFinal.split("-");
    const dateFinalInvert = `${day}-${month}-${year}`;
    return dateFinalInvert;
  };

  return (
    <section>
      <div className="formAdd">
        <form
          action="/dashboard"
          className="form"
          method="post"
          onSubmit={createCrop}
        >
          <span className="close" onClick={close}>
            ×
          </span>
          <label htmlFor="id_device">ID de dispositivo</label>
          <input
            type="text"
            id="id_device"
            name="id_device"
            autoComplete="off"
          />
          <label htmlFor="namePanel">Nombre del cultivo</label>
          <input type="text" id="namePanel" name="name" autoComplete="off" />
          <label htmlFor="directionPanel" name="direction">
            Dirección
          </label>
          <input
            type="text"
            id="directionPanel"
            name="location"
            autoComplete="off"
          />
          <label htmlFor="type">Variedad o tipo de cultivo</label>
          <select name="type" id="type">
            <option value="lechuga">Lechuga</option>
          </select>
          <label htmlFor="irrigation">Método de riego</label>
          <select id="irrigation" name="irrigation">
            <option value="bomba_agua">Bomba de agua</option>
          </select>
          <div className="falseValidation"></div>
          <input type="submit" value={"Añadir"} />
        </form>
      </div>
      <header className="mainHeader">
        <div className="headerFirst">
        <div className="titles">
          <h1>Panel General</h1>
          <h2>Nombre de usuario</h2>
        </div>
        <section className="articlesContainer">
          <article className="articlesHeader">
            <div className="articlesImg">
              <img src="/fertilizante.png" alt="" />
            </div>
            <div className="articlesInfo">
              <h2>Comprar productos</h2>
              <a href="/productos"><button>Acceder</button></a>
            </div>
          </article>
          <article className="articlesHeader">
            <div className="articlesImg">
              <img src="/jardinero.png" alt="" />
            </div>
            <div className="articlesInfo">
              <h2>Vinculación (Comercio)</h2>
              <a href="productos"><button>Acceder</button></a>
            </div>
          </article>
          <article className="articlesHeader">
            <div className="articlesImg">
              <img src="/smart-farm.png" alt="" />
            </div>
            <div className="articlesInfo">
              <h2>Recomendaciones</h2>
              <a href="productos"><button>Acceder</button></a>
            </div>
          </article>
        </section>
        </div>
        <div className="icons">
          <a href="">
            <Config />
          </a>
          <a href="/login" onClick={handleLogout}>
            <Logout />
          </a>
        </div>
      </header>
      <button className="buttonAdd" onClick={openForm}>
        Añadir +
      </button>
      <main className="crops">
        {crops.map((item, index) => {
          return (
            <Zone
              key={index}
              title={item.name}
              location={item.location}
              type={item.type}
              days={item.days}
              stage={item.stage}
              date={setDate(item.crop_verified_at)}
            />
          );
        })}
      </main>
    </section>
  );
}


