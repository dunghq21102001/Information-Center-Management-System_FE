<template>
  <div class="w-full">
    <div class="w-full flex items-start justify-between">
      <!-- left side -->
      <div class="w-[30%] brr-cus">
        <div class="w-[90%] mx-auto flex items-center justify-between mt-5">
          <input
            type="text"
            class="w-[80%] input-s h-[40px]"
            placeholder="Search chats"
            v-model="searchQuery"
            name=""
            id=""
            @input="searchUser"
          />
          <button
            title="Add new chat"
            class="btn-primary w-[39px] h-[39px] rounded-full"
          >
            +
          </button>
        </div>

        <div
          class="w-[90%] mx-auto flex flex-col items-start py-3 h-[80vh] mt-3 overflow-y-scroll"
        >
          <!-- list chat -->
          <div
            v-for="client in clientBoxChats"
            @click="openChat(client)"
            class="w-full h-[70px] flex items-center hover:bg-blur rounded-lg cursor-pointer my-2"
            :class="client?.id == currentClientId ? 'bg-blur' : ''"
          >
            <div
              class="w-[50px] h-[50px] overflow-hidden flex items-center justify-center rounded-full"
            >
              <img :src="client?.avatar" alt="avt user" class="w-full h-full" />
            </div>
            <div class="flex flex-col items-start ml-4 w-[80%] relative">
              <div class="w-full flex items-center justify-between">
                <span class="truncate-text">{{ client?.username }}</span>
                <span class="truncate-text mr-6">{{
                  formattedDate(client?.date?.seconds)
                }}</span>
              </div>
              <p
                class="truncate-text"
                :class="client?.seen == false ? 'font-bold' : ''"
              >
                {{ client?.lastMessage }}
              </p>
              <span
                v-show="client?.seen == false"
                class="block absolute right-5 top-[50%] translate-y-[-24%] text-[30px] text-blue-500"
                >•</span
              >
            </div>
          </div>
        </div>
      </div>

      <!-- right side -->
      <div class="w-[70%] flex h-[90vh] flex-col items-start justify-between">
        <!-- p 1 -->
        <div class="w-full h-[10%] brb-cus flex items-center">
          <div class="w-[90%] mx-auto flex items-center">
            <div
              class="w-[40px] h-[40px] overflow-hidden flex items-center justify-center rounded-full"
            >
              <img
                :src="currentClientAvt"
                alt="avt user"
                class="w-[40px] h-[40px]"
              />
            </div>
            <div class="flex flex-col ml-4">
              <span>{{ currentClientUsername }}</span>
              <span class="text-gray-400 text-[14px]">Online</span>
            </div>
          </div>
        </div>

        <!-- p 2 -->
        <div
          class="w-full h-[82%] overflow-y-scroll hide-scrollbar"
          ref="chatBoxContainer"
        >
          <div class="w-[90%] mx-auto py-2">
            <!-- chat 1 -->
            <div
              v-for="mess in messages"
              class="w-full flex items-center justify-start my-2"
            >
              <div
                class="w-full flex items-start"
                :class="
                  mess?.userId == authStore.getAuth?.id
                    ? 'flex-row-reverse'
                    : ''
                "
              >
                <div
                  class="w-[40px] h-[40px] overflow-hidden rounded-full flex items-center justify-center"
                >
                  <img
                    class="w-full h-[40px] object-fill"
                    :src="
                      mess?.userId == authStore.getAuth?.id
                        ? authStore.getAuth?.avatar
                        : currentClientAvt
                    "
                    alt="user avatar"
                  />
                </div>
                <div
                  class="flex max-w-[70%] flex-col p-2 rounded-lg"
                  :class="
                    mess?.userId == authStore.getAuth?.id
                      ? 'bg-primary mr-4'
                      : 'bg-gray-100 ml-4'
                  "
                >
                  <p
                    class="w-full text-wrap"
                    :class="
                      mess?.userId == authStore.getAuth?.id
                        ? 'text-white'
                        : 'text-black'
                    "
                  >
                    {{ mess?.text }}
                  </p>
                  <span
                    :class="
                      mess?.userId != authStore.getAuth?.id
                        ? 'text-[#a39f9f] text-[12px] mt-4'
                        : 'text-white text-[12px] mt-4'
                    "
                    >{{ formattedDate(mess?.date?.seconds) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- p 3 -->
        <div class="w-full h-[8%] brt-cus flex items-center">
          <div class="w-[90%] mx-auto flex justify-between items-center">
            <input
              type="text"
              v-model="messageText"
              ref="textInput"
              class="input-c w-[94%]"
              placeholder="Type your message..."
              @keydown.enter="sendMessage"
            />
            <div class="w-[5%] relative">
              <v-icon
                @click="isShowIcon = !isShowIcon"
                v-click-outside-element="hiddenIcon"
                name="bi-emoji-smile-fill"
                class="cursor-pointer"
                scale="1.5"
                :fill="`#${systemStore.getTheme.color}`"
              />
              <div
                v-show="isShowIcon"
                class="absolute br-f w-[200px] h-[300px] top-[-305px] right-[3px] bg-white overflow-y-scroll"
              >
                <span
                  @click="insertIcon(item)"
                  class="cursor-pointer hover:bg-gray-200 m-1"
                  v-for="item in listIcons"
                >
                  {{ item }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-show="isShowNewChat"
      class="fixed top-0 left-0 right-0 bottom-0 bg-cus flex items-center justify-center z-[90]"
    >
      <div class="w-[90%] md:w-[50%] lg:w-[40%] bg-white rounded-lg p-3">
        ok
      </div>
    </div>
  </div>
</template>
<script>
import { db } from "../../common/firebase";
import {
  onSnapshot,
  collection,
  doc,
  deleteDoc,
  setDoc,
  addDoc,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { useAuthStore } from "../../stores/Auth";
import { useSystemStore } from "../../stores/System";
import { onUnmounted } from "vue";
import swal from "../../common/swal";
export default {
  setup() {
    const systemStore = useSystemStore();
    const authStore = useAuthStore();
    return { systemStore, authStore };
  },
  components: {},
  data() {
    return {
      isShowNewChat: false,
      searchQuery: "",
      messageText: "",
      isShowIcon: false,
      messages: [],
      currentClientId: "",
      currentClientUsername: "",
      currentClientAvt: "",
      clientBoxChats: [],
      tmpClientBoxChats: [],
      listIcons: [
        "😀",
        "😃",
        "😄",
        "😁",
        "😆",
        "😅",
        "😂",
        "🤣",
        "😊",
        "😇",
        "🙂",
        "🙃",
        "😉",
        "😌",
        "😍",
        "🥰",
        "😘",
        "😗",
        "😙",
        "😚",
        "😋",
        "😛",
        "😝",
        "😜",
        "🤪",
        "🤨",
        "🧐",
        "🤓",
        "😎",
        "🤩",
        "🥳",
        "😏",
        "😒",
        "😞",
        "😔",
        "😟",
        "😕",
        "🙁",
        "☹️",
        "😣",
        "😖",
        "😫",
        "😩",
        "🥺",
        "😢",
        "😭",
        "😤",
        "😠",
        "😡",
        "🤬",
        "🤯",
        "😳",
        "🥵",
        "🥶",
        "😶",
        "🤫",
        "🤥",
        "😶",
        "😐",
        "😑",
        "😬",
        "🙄",
        "😯",
        "😦",
        "😧",
        "😮",
        "😲",
        "🥱",
        "😴",
        "🤤",
        "😪",
        "😮‍💨",
        "😵",
        "😵‍💫",
        "🤐",
        "🥴",
        "🤢",
        "🤮",
        "🤧",
        "😷",
        "🤒",
        "🤕",
        "🤑",
        "🤠",
      ],
    };
  },
  created() {},
  mounted() {
    this.systemStore.setChangeLoading(true);
    const pathCollectionDB = this.authStore.getAuth?.id;

    this.$nextTick(() => {
      const chatBoxContainer = this.$refs.chatBoxContainer;
      chatBoxContainer.scrollTop = chatBoxContainer.scrollHeight;
    });

    const chatSnapshot = onSnapshot(
      query(collection(db, `${pathCollectionDB}`), orderBy("date", "desc")),
      (snapshot) => {
        this.clientBoxChats = snapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
        this.tmpClientBoxChats = this.clientBoxChats;
        this.currentClientAvt = this.clientBoxChats[0]?.avatar;
        this.currentClientId = this.clientBoxChats[0]?.id;
        this.currentClientUsername = this.clientBoxChats[0]?.username;

        // Move the subsequent code here
        // console.log(this.clientBoxChats);
        this.systemStore.setChangeLoading(false);

        // Check if currentClientId is not null before proceeding
        if (this.currentClientId) {
          this.systemStore.setChangeLoading(true);
          const messages = onSnapshot(
            query(
              collection(
                db,
                `${pathCollectionDB}/` + this.currentClientId + "/messages"
              ),
              orderBy("date", "asc")
            ),
            (snapshot) => {
              this.messages = snapshot.docs.map((doc) => {
                return { ...doc.data(), id: doc.id };
              });
              this.systemStore.setChangeLoading(false);
            }
          );
          this.systemStore.setChangeLoading(true);
          // onUnmounted(messages);
        }
      }
    );
  },
  methods: {
    openChat(client) {
      this.systemStore.setChangeLoading(true);
      this.currentClientId = client?.id;
      this.currentClientAvt = client?.avatar;
      this.currentClientUsername = client?.username;
      onSnapshot(
        query(
          collection(
            db,
            `${this.authStore.getAuth?.id}/` +
              this.currentClientId +
              "/messages"
          ),
          orderBy("date", "asc")
        ),
        (snapshot) => {
          this.messages = snapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          });
          this.systemStore.setChangeLoading(false);
        }
      );
      this.systemStore.setChangeLoading(false);

      setDoc(
        doc(db, `${this.authStore.getAuth?.id}/` + this.currentClientId),
        { seen: true }, // Update only the 'seen' property
        { merge: true } // Use merge option to update only specified fields without overwriting the entire document
      );
    },
    sendMessage() {
      if (
        this.currentClientId.trim() == "" ||
        this.currentClientId.trim() == null
      ) {
        return swal.error("Let's add new users to chat!");
      }
      if (this.messageText.trim() == "" || this.messageText.trim() == null)
        return;

      // create an array to store all promises
      const promises = [];

      // add cho người gửi
      promises.push(
        addDoc(
          collection(
            db,
            `${this.authStore.getAuth?.id}/` +
              this.currentClientId +
              "/messages"
          ),
          {
            text: this.messageText,
            userId: this.authStore.getAuth?.id, //id người gửi
            date: Timestamp.now(),
          }
        )
      );

      // add cho người nhận
      promises.push(
        addDoc(
          collection(
            db,
            `${this.currentClientId}/` +
              this.authStore.getAuth?.id +
              "/messages"
          ),
          {
            text: this.messageText,
            userId: this.authStore.getAuth?.id, //id người gửi
            date: Timestamp.now(),
          }
        )
      );

      // tin nhắn cuối bên người gửi
      promises.push(
        setDoc(
          doc(db, `${this.authStore.getAuth?.id}/` + this.currentClientId),
          {
            avatar: this.currentClientAvt,
            date: Timestamp.now(),
            lastMessage: this.messageText,
            seen: true,
            username: this.currentClientUsername,
          }
        )
      );

      // tin nhắn cuối bên người nhận
      promises.push(
        setDoc(
          doc(db, `${this.currentClientId}/` + this.authStore.getAuth?.id),
          {
            avatar: this.authStore.getAuth?.avatar,
            date: Timestamp.now(),
            lastMessage: this.messageText,
            seen: false,
            username: this.authStore.getAuth?.username,
          }
        )
      );

      // Wait for all promises to resolve before proceeding
      Promise.all(promises)
        .then(() => {
          // Code to execute after all Firebase operations have completed
          this.messageText = "";
          this.$nextTick(() => {
            const chatBoxContainer = this.$refs.chatBoxContainer;
            chatBoxContainer.scrollTop = chatBoxContainer.scrollHeight;
          });
        })
        .catch((error) => {
          console.error("Error in Firebase operations:", error);
          // Handle error if needed
        });
    },
    formattedDate(seconds) {
      const date = new Date(seconds * 1000);
      const now = new Date();

      // Nếu là ngày hôm nay, chỉ hiển thị giờ và phút
      if (this.isSameDay(date, now)) {
        return this.formatTime(date);
      }

      // Nếu là ngày hôm qua, trả về "Yesterday"
      const yesterday = new Date(now);
      yesterday.setDate(now.getDate() - 1);
      if (this.isSameDay(date, yesterday)) {
        return "Yesterday";
      }

      // Nếu là tuần trước, trả về "Last week"
      const lastWeek = new Date(now);
      lastWeek.setDate(now.getDate() - 7);
      if (date > lastWeek) {
        return "Last week";
      }

      // Nếu là nhiều tuần trước, trả về số tuần + " weeks ago"
      const numberOfWeeks = Math.floor(
        (now.getTime() - date.getTime()) / (7 * 24 * 60 * 60 * 1000)
      );
      return numberOfWeeks + " weeks ago";
    },
    getCurrentDateTime() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0"); // Thêm '0' phía trước nếu tháng chỉ có một chữ số
      const day = String(now.getDate()).padStart(2, "0"); // Thêm '0' phía trước nếu ngày chỉ có một chữ số
      const hours = String(now.getHours()).padStart(2, "0"); // Thêm '0' phía trước nếu giờ chỉ có một chữ số
      const minutes = String(now.getMinutes()).padStart(2, "0"); // Thêm '0' phía trước nếu phút chỉ có một chữ số

      return `${day} ${month} ${year} ${hours}:${minutes}`;
    },
    hiddenIcon() {
      this.isShowIcon = false;
    },
    insertIcon(icon) {
      const input = this.$refs.textInput;
      const cursorPosition = input.selectionStart;
      this.messageText =
        this.messageText.substring(0, cursorPosition) +
        icon +
        this.messageText.substring(cursorPosition);
      const newCursorPosition = cursorPosition + 1;
      input.setSelectionRange(newCursorPosition, newCursorPosition);
      input.focus();
    },
    isSameDay(date1, date2) {
      return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
      );
    },
    formatTime(date) {
      const hours = date.getHours();
      let minutes = date.getMinutes();
      if (
        minutes == 0 ||
        minutes == 1 ||
        minutes == 2 ||
        minutes == 3 ||
        minutes == 4 ||
        minutes == 5 ||
        minutes == 6 ||
        minutes == 7 ||
        minutes == 8 ||
        minutes == 9
      )
        minutes = `0${minutes}`;
      return `${hours}:${minutes}`;
    },
    searchUser() {
      if (this.searchQuery.trim() === "") {
        this.clientBoxChats = this.tmpClientBoxChats;
      } else {
        this.clientBoxChats = this.tmpClientBoxChats.filter((client) =>
          client.username.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    },
  },
};
</script>
<style scoped>
.brr-cus {
  border-right: 1px solid rgb(227, 227, 227);
  height: 100%;
}
.brb-cus {
  border-bottom: 1px solid rgb(227, 227, 227);
}
.brt-cus {
  border-top: 1px solid rgb(227, 227, 227);
}
.input-s {
  outline: none;
  border: 1px solid rgb(227, 227, 227);
  padding: 8px 15px;
  border-radius: 10px;
}

.br-f {
  border: 1px solid rgb(227, 227, 227);
}

.input-c {
  outline: none;
  border: 1px solid rgb(185, 185, 185);
  padding: 8px 15px;
  border-radius: 30px;
}

.truncate-text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 1;
  text-overflow: ellipsis;
}

.bg-cus {
  background-color: rgba(0, 0, 0, 0.8);
}
</style>
