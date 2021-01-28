import { useContext } from "react";
import { AuthContext } from "../../authContext";

function Home() {
  const details = useContext(AuthContext);

  return (
    <div className="profile-default">
      <h2>Merhaba, {details.display_name}!</h2>
      <p>
        Bu panelden çözdüğünüz Algoritma Alıştırmaları ve izlediğiniz Video
        Dersler'in detaylarını görebilir ve profilinizi düzenleyebilirsiniz.
      </p>
    </div>
  );
}

export default Home;
