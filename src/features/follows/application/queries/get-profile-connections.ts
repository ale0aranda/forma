import type {
  ProfileConnection,
  ProfileConnectionsRepository,
  ProfileConnectionType
} from '../ports/profile-connections-repository';

export async function getProfileConnections(
  repository: ProfileConnectionsRepository,
  username: string,
  type: ProfileConnectionType
): Promise<ProfileConnection[]> {
  return repository.getProfileConnections(username, type);
}
