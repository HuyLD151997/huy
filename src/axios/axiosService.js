import axios from "axios";
import swal from "sweetalert2";

class AxiosService {
  constructor() {
    //axios bộ thư viện hỗ trợ call api
    const intance = axios.create();
    intance.interceptors.response.use(this.handleSuccess, this.handleError);
    this.intance = intance;
  }

  handleSuccess(response) {
    return response;
  }
  handleError(error) {
    if (error.response.status === 401) {
      swal.fire({
        icon: "error",
        text: "Thời gian truy cập hết hạn, xin ĐĂNG NHẬP lại",
        timer: 3000,
      });
      // localStorage.clear();
      // window.location.href = "/";
      return Promise.reject(error);
    }
    if (error.response.status === 400) {
      return Promise.reject(error);
    }
  }

  get(url, token) {
    return this.intance.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  post(url, body, token) {
    console.log(body);
    return this.intance.post(url, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  post2(url, body, token) {
    const formData = new FormData();
    formData.append("UserName", body.UserName);
    formData.append("Password", body.Password);
    formData.append("Fullname", body.Fullname);
    formData.append("Gender", body.Gender);
    formData.append("ProvinceId", body.ProvinceId);
    formData.append("DistrictId", body.DistrictId);
    formData.append("WardId", body.WardId);
    formData.append("Address", body.Address);
    formData.append("Latitude", body.Latitude);
    formData.append("Longitude", body.Longitude);
    formData.append("PhoneNumber", body.PhoneNumber);
    formData.append("Email", body.Email);
    formData.append("AvatarFile", body.AvatarFile[0]);

    return this.intance.post(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "multipart/form-data",
      },
    });
  }
  post3(url, body, token) {
    const formData = new FormData();

    formData.append("Description", body.Description);
    formData.append("ImageFile", body.ImageFile[0]);
    formData.append("Type", body.Type);

    return this.intance.post(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "multipart/form-data",
      },
    });
  }

  post4(url, body, token) {
    const formData = new FormData();

    formData.append("Description", body.Description);
    formData.append("ImageFile", body.ImageFile[0]);
    formData.append("Quantity", body.Quantity);

    return this.intance.post(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "multipart/form-data",
      },
    });
  }

  put(url, body, token) {
    return this.intance.put(url, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  // put1(url, body, token) {
  //   console.log(body);
  //   return this.intance.put(
  //     url,
  //     {
  //       body: JSON.stringify({
  //         message: body.message,
  //         isUpdateSuccess: body.isUpdateSuccess,
  //       }),
  //     },
  //     {
  //       headers: { Authorization: `Bearer ${token}` },
  //     }
  //   );
  // }

  put2(url, body, token) {
    const formData = new FormData();
    formData.append("File", body.File);
    return this.intance.put(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "multipart/form-data",
      },
    });
  }

  put6(url, body, token) {
    const formData = new FormData();
    formData.append("File", body.File);
    return this.intance.put(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "multipart/form-data",
      },
    });
  }

  put3(url, body, token) {
    console.log(body);
    const formData = new FormData();
    formData.append("File", body.File);
    return this.intance.put(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "multipart/form-data",
      },
    });
  }

  delete(url, token) {
    return this.intance.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export default new AxiosService();
