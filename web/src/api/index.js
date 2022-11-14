import axios from "axios";

const API_URL = "htpp://localhost:5000";

export const userCreate = (username, displayName, password, email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const resp = await axios.post(new URL("api/user", API_URL).toString(), {
        username,
        displayName,
        password,
        email,
      });
      resolve(resp);
    } catch (e) {
      reject(e);
    }
  });
};

export const userLogin = (username, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const resp = await axios.post(new URL("api/auth", API_URL).toString(), {
        username,
        password,
      });
      saveSiteUser(resp);
      resolve(resp.data);
    } catch (e) {
      reject(e);
    }
  });
};

export const userLogout = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const resp = await axios.delete(new URL("api/auth", API_URL).toString(), {
        headers: { "trible-b": getSiteUser() },
      });
      resolve(resp.data);
    } catch (e) {
      reject(e);
    }
  });
};

export const blogGet = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const resp = await axios.get(new URL("api/blog", API_URL).toString(), {});
      resolve(resp.data);
    } catch (e) {
      reject(e);
    }
  });
};

export const saveSiteUser = (axiosResponse) => {
  localStorage.setItem("trible-b", axiosResponse.headers["trible-b"]);
};

export const getSiteUser = () => {
  return localStorage.getItem("trible-b");
};

export const clearSiteUser = () => {
  localStorage.clear("trible-b");
};

export const userGet = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const tribleB = getSiteUser();
      const resp = await axios.get(new URL("api/user", API_URL).toString(), {
        headers: { "trible-b": tribleB },
      });
      resolve(resp.data);
    } catch (e) {
      reject(e);
    }
  });
};

export const blogCreate = ({ title, body }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const tribleB = getSiteUser();
      const resp = await axios.post(
        new URL("api/blog", API_URL).toString(),
        { title, body },
        {
          headers: { "trible-b": tribleB },
        }
      );
      const { status } = resp.data;
      const { post_id: postId } = resp.data.data;
      if (status === "success") resolve(postId);
      else throw new Error("Failed to create post.");
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
};

export const getBlogPosts = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const tribleB = getSiteUser();
      const resp = await axios.get(new URL("api/blog", API_URL).toString(), {
        headers: { "trible-b": tribleB },
      });
      const { status, data } = resp.data;
      if (status === "success") resolve(data);
      else throw new Error("Failed to get posts.");
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
};

export const getImage = (path) => {
  return new URL(path, API_URL).toString();
};

export const getBlogPost = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const tribleB = getSiteUser();
      const resp = await axios.get(
        new URL(`api/blog/${id}`, API_URL).toString(),
        {
          headers: { "trible-b": tribleB },
        }
      );

      const { status, data } = resp.data;
      console.log(data);
      if (status === "success") resolve(data);
      else throw new Error("Failed to get posts.");
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
};
