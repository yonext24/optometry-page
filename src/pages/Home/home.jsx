export const Home = () => {
  return (
    <>
    <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src="https://ieqfb.com/wp-content/uploads/Diseño-sin-título-11.jpg" className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://d31g6oeq0bzej7.cloudfront.net/Assets/image/jpeg/a621b5c6-920b-471f-b10e-eb69b08a9259.jpg" className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://www.lasalle.edu.co/wcm/connect/3a02e518-5563-472e-ad89-49d86dd24314/1.jpg?MOD=AJPERES&CACHEID=ROOTWORKSPACE-3a02e518-5563-472e-ad89-49d86dd24314-nlSCr2s" className="d-block w-100" alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
<br/>

<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
  <h1 style={{ textAlign: 'center' }}>¿Como funciona?</h1>
  <br/>
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <div className="card" style={{ width: '18rem', marginRight: '1rem' }}>
      <img src="https://cdn-icons-png.flaticon.com/512/2029/2029830.png" className="card-img-top" alt="..."/>
      <div className="card-body">
        <p className="card-text">Prescribe las tareas</p>
      </div>
    </div>
    <div className="card" style={{ width: '18rem', marginRight: '1rem' }}>
      <img src="https://cdn-icons-png.flaticon.com/512/5868/5868370.png" className="card-img-top" alt="..."/>
      <div className="card-body">
        <p className="card-text">Control del progreso</p>
      </div>
    </div>
    <div className="card" style={{ width: '18rem', marginRight: '1rem' }}>
      <img src="https://cdn-icons-png.flaticon.com/512/7819/7819907.png" className="card-img-top" alt="..."/>
      <div className="card-body">
        <p className="card-text">El paciente trabaja desde la casa</p>
      </div>
    </div>
    <div className="card" style={{ width: '18rem' }}>
      <img src="https://cdn-icons-png.flaticon.com/512/7160/7160500.png" className="card-img-top" alt="..."/>
      <div className="card-body">
        <p className="card-text">Supervisa el cumplimiento</p>
      </div>
    </div>
  </div>
</div>
<br/>
<br/>
<div className="container2">
      <p className="text">Texto aquí</p>
      <img
        src="https://via.placeholder.com/150"
        alt="imagen"
        className="image"
      />
    </div>
    <br/>
    <br/>
    </>
  )
}
