<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { gql, GraphQLClient } from "graphql-request";

const auth = useAuth();

onMounted(() => {
  if (!auth.accessToken.value) {
    navigateTo("/login");
  }
});

const client = new GraphQLClient("https://graphql.anilist.co", {
  headers: {
    Authorization: `Bearer ${auth.accessToken.value}`,
  },
});

const { data: user, isLoading: userLoading } = useQuery({
  queryKey: ["dingdong"],
  queryFn: async () => {
    return client.request(
      gql`
        query Def {
          Viewer {
            id
          }
        }
      `
    );
  },
  retry: false,
});

const { data: media, isLoading: mediaLoading } = useQuery({
  queryKey: ["testing"],
  queryFn: async () => {
    return client.request(
      gql`
        query Abc($id: Int!) {
          MediaListCollection(userId: $id, type: ANIME) {
            lists {
              name
              entries {
                id
                media {
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

const orderedLists = computed(() => {
  if (!media.value) return [];

  return media.value.User.mediaListOptions.animeList.sectionOrder
    .map((section: string) => {
      const list = media.value.MediaListCollection.lists.find(
        (l) => l.name === section
      );
      return {
        name: section,
        entries: list ? list.entries : [],
      };
    })
    .filter((list) => list.entries.length > 0);
});
</script>

<template>
  <div class="p-4">
    <div v-if="userLoading || mediaLoading">Loading...</div>
    <div v-else-if="media" class="space-y-4">
      <div v-for="list in orderedLists" :key="list.name">
        <h2 class="font-bold">{{ list.name }}</h2>
        <ul class="mt-4 space-y-4">
          <li v-for="entry in list.entries" :key="entry.id" class="flex">
            <NuxtImg
              :src="entry.media.coverImage.large"
              :alt="entry.media.title.english"
              class="w-20"
            />
            <div class="ml-4">
              <div class="font-bold">{{ entry.media.title.english }}</div>
              <div>Score: {{ entry.score }}</div>
              <div>{{ entry.progress }} / {{ entry.media.episodes }}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
