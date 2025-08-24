import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { gql, GraphQLClient } from "graphql-request";

export function useAnilist() {
  const auth = useAuth();
  const queryClient = useQueryClient();

  const client = new GraphQLClient("https://graphql.anilist.co", {
    headers: {
      Authorization: `Bearer ${auth.accessToken.value}`,
    },
  });

  const { data: user, isLoading: userLoading } = useQuery<User>({
    queryKey: ["viewer"],
    queryFn: async () => {
      return client.request<User>(
        gql`
          query Viewer {
            Viewer {
              id
            }
          }
        `
      );
    },
    retry: false,
  });

  const { data: media, isLoading: mediaLoading } = useQuery<MediaData>({
    queryKey: ["media"],
    queryFn: async () => {
      return client.request<MediaData>(
        gql`
          query Media($id: Int!) {
            MediaListCollection(userId: $id, type: ANIME) {
              lists {
                name
                entries {
                  id
                  media {
                    id
                    title {
                      english
                    }
                    coverImage {
                      large
                    }
                    episodes
                  }
                  score
                  progress
                }
              }
            }
            User(id: $id) {
              mediaListOptions {
                animeList {
                  sectionOrder
                }
              }
            }
          }
        `,
        {
          id: user.value?.Viewer.id,
        }
      );
    },
    retry: false,
    enabled: computed(() => !!user.value?.Viewer.id),
  });

  const loading = computed(() => userLoading.value || mediaLoading.value);

  const { mutate: updateProgress } = useMutation<
    unknown,
    Error,
    MutationParams
  >({
    mutationFn: async (params: MutationParams) => {
      return client.request(
        gql`
          mutation UpdateMediaListEntries($progress: Int, $ids: [Int]) {
            UpdateMediaListEntries(progress: $progress, ids: $ids) {
              progress
              media {
                title {
                  english
                }
              }
              score
              completedAt {
                year
                month
                day
              }
              status
            }
          }
        `,
        {
          ids: params.ids,
          progress: params.progress,
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["media"] });
    },
  });

  return {
    user,
    media,
    loading,
    updateProgress,
  };
}
