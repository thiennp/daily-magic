/** The project to delete and the signed-in owner who asked for it. */
export default interface ProjectDeleteTarget {
  readonly projectId: string;
  readonly ownerUserId: string;
}
