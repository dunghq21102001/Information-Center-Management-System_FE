<template>
  <div class="w-full h-[78vh] overflow-hidden">
    <div class="w-full flex items-start justify-between">
      <!-- left side -->
      <div class="w-[30%] brr-cus h-[77vh]">
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
            @click="showFormNewChat"
          >
            +
          </button>
        </div>

        <div
          class="w-[90%] mx-auto flex flex-col h-[77vh] items-start py-3 mt-3 overflow-y-scroll"
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
      <div class="w-[70%] flex h-[77vh] flex-col items-start justify-between">
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
          <div class="w-[90%] mx-auto flex justify-between items-center mt-2">
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
      @click.self="isShowNewChat = false"
      class="fixed top-0 left-0 right-0 bottom-0 bg-cus flex items-center justify-center z-[90]"
    >
      <div class="w-[90%] md:w-[50%] lg:w-[40%] bg-white rounded-lg p-3">
        <div class="w-full">
          <span class="block text-[20px]"
            >Select the user to initiate a new chat</span
          >
          <!-- <select v-model="currentClientId" class="px-3 py-1 min-w-[200px] mt-2">
            <option v-for="u in users" :value="u?.id">
              {{ u?.email }}
            </option>
          </select> -->
          <div
            class="px-3 py-1 w-[300px] cursor-pointer border-black border-[1px] border-solid rounded-lg relative"
            v-click-outside-element="closeList"
            @click="isShowList = !isShowList"
          >
            <div
              v-show="isShowList"
              class="absolute w-full p-2 bg-white top-[103%] left-0 max-h-[300px] overflow-y-scroll shadow-lg rounded-sm"
            >
              <div
                @click="changeSelectedNewUser(u)"
                class="flex items-center w-full my-2 hover:bg-blur"
                v-for="u in users"
              >
                <div class="w-[50px] h-[50px] overflow-hidden rounded-full">
                  <img
                    :src="u?.avatar"
                    class="object-fill w-full h-full"
                    alt="user avatar"
                  />
                </div>
                <div class="flex flex-col items-start ml-3">
                  <span>{{ u?.userName }}</span>
                  <span>{{ u?.email }}</span>
                </div>
              </div>
            </div>
            <div class="flex items-center">
              <div class="w-[50px] h-[50px] overflow-hidden rounded-full">
                <img
                  :src="newUserSelected.avatar"
                  class="object-fill w-full h-full"
                  alt="user avatar"
                />
              </div>
              <div class="flex flex-col items-start ml-3">
                <span>{{ newUserSelected.userName }}</span>
                <span>{{ newUserSelected.email }}</span>
              </div>
            </div>
          </div>
          <span class="block text-[20px] mt-5">Message</span>
          <input
            type="text"
            v-model="newText"
            class="border-black border-b-[1px] w-full border-solid focus:outline-none"
          />

          <div class="w-full flex items-center justify-between">
            <button
              class="btn-cancel px-3 py-1 mt-5"
              @click="isShowNewChat = false"
            >
              Cancel
            </button>
            <button class="btn-primary px-3 py-1 mt-5" @click="sendNewMessage">
              Send
            </button>
          </div>
        </div>
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
import API_USER from "../../API/API_USER";
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
      users: [],
      newUserSelected: {
        id: "",
        userName: "",
        avatar: "",
        email: "",
      },
      isShowList: false,
      newText: "",
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
  created() {
    this.fetchUsers();
  },
  mounted() {
    // this.systemStore.setChangeLoading(true);
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
        // this.systemStore.setChangeLoading(false);

        // Check if currentClientId is not null before proceeding
        if (this.currentClientId) {
          // this.systemStore.setChangeLoading(true);
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
              // this.systemStore.setChangeLoading(false);
            }
          );
          // this.systemStore.setChangeLoading(true);
          // onUnmounted(messages);
        }
      }
    );
  },
  methods: {
    openChat(client) {
      // this.systemStore.setChangeLoading(true);
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
          // this.systemStore.setChangeLoading(false);
        }
      );
      // this.systemStore.setChangeLoading(false);

      setDoc(
        doc(db, `${this.authStore.getAuth?.id}/` + this.currentClientId),
        { seen: true }, // Update only the 'seen' property
        { merge: true } // Use merge option to update only specified fields without overwriting the entire document
      );
    },
    sendNewMessage() {
      this.currentClientAvt = this.newUserSelected.avatar;
      this.currentClientId = this.newUserSelected.id;
      this.currentClientUsername = this.newUserSelected.userName;

      // người gửi (last mess)
      setDoc(doc(db, this.authStore.getAuth?.id, this.newUserSelected.id), {
        avatar: this.newUserSelected.avatar,
        date: Timestamp.now(),
        lastMessage: this.newText,
        seen: true,
        username: this.newUserSelected.userName,
      });

      // người nhận (last mess)
      setDoc(doc(db, this.newUserSelected.id, this.authStore.getAuth?.id), {
        avatar: this.authStore.getAuth?.avatar,
        date: Timestamp.now(),
        lastMessage: this.newText,
        seen: false,
        username: this.authStore.getAuth?.username,
      });

      // add to chat (ng gửi)
      addDoc(
        collection(
          db,
          `${this.authStore.getAuth?.id}/` +
            this.newUserSelected.id +
            "/messages"
        ),
        {
          text: this.newText,
          userId: this.authStore.getAuth?.id, //id người gửi
          date: Timestamp.now(),
        }
      );

      // add to chat (ng nhận)
      addDoc(
        collection(
          db,
          `${this.newUserSelected.id}/` +
            this.authStore.getAuth?.id +
            "/messages"
        ),
        {
          text: this.newText,
          userId: this.authStore.getAuth?.id, //id người gửi
          date: Timestamp.now(),
        }
      );

      this.isShowNewChat = false;
    },
    sendMessage() {
      if (this.currentClientId == "" || this.currentClientId == null) {
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

      Promise.all(promises)
        .then(() => {
          this.messageText = "";
          this.$nextTick(() => {
            const chatBoxContainer = this.$refs.chatBoxContainer;
            chatBoxContainer.scrollTop = chatBoxContainer.scrollHeight;
          });
        })
        .catch((error) => {
          console.error("Error in Firebase operations:", error);
        });
    },
    showFormNewChat() {
      this.newUserSelected.avatar = this.users[0]?.avatar;
      this.newUserSelected.id = this.users[0]?.id;
      this.newUserSelected.userName = this.users[0]?.userName;
      this.newUserSelected.email = this.users[0]?.email;
      this.isShowNewChat = true;
    },
    changeSelectedNewUser(user) {
      this.newUserSelected.avatar = user?.avatar;
      this.newUserSelected.id = user?.id;
      this.newUserSelected.userName = user?.userName;
      this.newUserSelected.email = user?.email;
    },
    closeList() {
      this.isShowList = false;
      this.newText = "";
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
    fetchUsers() {
      this.systemStore.setChangeLoading(true);
      API_USER.users()
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          let tmpList = [];
          res.data.forEach((u) => {
            if (u?.id != this.authStore.getAuth?.id) {
              tmpList.push(u);
            }
          });
          this.users = tmpList
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
        });
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
