import { Button, Popconfirm } from "antd";
import { IPlaylist } from "../../types";

interface IPlaylistItemArchiveButton {
  playlist: IPlaylist;
  archive: (bool: boolean, id: string) => void;
}

function PlaylistItemArchiveButton(props: IPlaylistItemArchiveButton) {
  const { playlist, archive } = props;
  return (
    <Popconfirm
      placement="top"
      title={playlist.is_archived ? "Arşivden Çıkar?" : "Arşivle?"}
      onConfirm={() => archive(!playlist.is_archived, playlist.ID)}
      okText="Evet"
      cancelText="Hayır"
    >
      <Button>{playlist.is_archived ? "Arşivden Çıkar" : "Arşivle"}</Button>
    </Popconfirm>
  );
}

export default PlaylistItemArchiveButton;
