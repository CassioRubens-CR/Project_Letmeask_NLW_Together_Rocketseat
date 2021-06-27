import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/Button';
import { FormEvent, useState } from 'react';

import ilustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg';

import '../styles/auth.scss';
import { database } from '../services/firebase';
import { useTheme } from '../hooks/useTheme';

export function NewRoom() {
  const { user } = useAuth()
  const history = useHistory();
  const [newRoom, setNewRoom] = useState("");
  const {theme, toggleTheme} = useTheme();

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === "") {
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    history.push(`/rooms/${firebaseRoom.key}`);
  }

  return (
    <div id="page-auth" className={theme}>
      <aside>
        <img src={ilustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <button
            onClick={toggleTheme}
            className="button-ligth-dark"
          >Light / Dark
          </button>
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da Sala"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">
              Criar Sala
            </Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">Clique Aqui</Link>
          </p>
        </div>
      </main>
    </div>
  )
}
