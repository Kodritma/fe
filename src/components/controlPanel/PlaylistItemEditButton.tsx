import { Button } from "antd";
import React from "react";
import { IPlaylist } from "../../types";

interface IPlaylistItemEditButton {
  setID: React.Dispatch<React.SetStateAction<string>>;
  playlist: IPlaylist;
  ID: string;
}

function PlaylistItemEditButton(props: IPlaylistItemEditButton) {
  const { setID, playlist, ID } = props;
  return (
    <Button
      type="primary"
      ghost
      style={{ marginRight: 10 }}
      onClick={() => {
        window.scrollTo({ top: 0 });
        setID(playlist.ID === ID ? "" : playlist.ID);
      }}
    >
      Düzenle
    </Button>
  );
}

export default PlaylistItemEditButton;
