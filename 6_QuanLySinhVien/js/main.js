let studentList = [];
// Function1: Lấy danh sách sinh viên từ backend thông qua axios

const fetchStudents = () => {
  axios({
    url: "http://svcy.myclass.vn/api/SinhVien/LayDanhSachSinhVien",
    method: "GET",
  })
    .then((res) => {
      // console.log(res);
      studentList = res.data;
      renderStudents();
    })
    .catch((err) => {
      console.log(err);
    });
};

// Function 2: hiển thị danh sách sinh viên ra màn hình
const renderStudents = () => {
  //giao diện của một sinh viên
  // <tr>
  //   <td>123</td>
  //   <td>Đặng Trung Hiếu</td>
  //   <td>dangtrunghieu147@gmail.com</td>
  //   <td>0334643124</td>
  //   <td>1</td>
  //   <td>2</td>
  //   <td>3</td>
  //   <td></td>
  // </tr>;
  //Duyệt  studentList, có bao nhiêu SV => <tr>
  let htmlContent = "";
  for (let student of studentList) {
    htmlContent += `
    <tr>
         <td>${student.MaSV}</td>
         <td>${student.HoTen}</td>
         <td>${student.Email}</td>
         <td>${student.SoDT}</td>
         <td>${student.DiemToan}</td>
         <td>${student.DiemLy}</td>
         <td>${student.DiemHoa}</td>
          <td>
            <button class="btn btn-danger" onclick="deleteStudent('${student.MaSV}')">Xóa</button>
            <button class="btn btn-info" onclick="getStudent('${student.MaSV}')">Cập nhật</button>
          </td>
     </tr>`;
    console.log(student, htmlContent);
  }
  console.log(htmlContent);
  document.getElementById("tableDanhSach").innerHTML = htmlContent;
};

// Function 3 : thêm sinh viên
const addStudent = () => {
  const studentId = document.getElementById("id").value;
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const idCard = document.getElementById("idCard").value;
  const math = document.getElementById("math").value;
  const physics = document.getElementById("physics").value;
  const chemistry = document.getElementById("chemistry").value;

  const newStudent = new Student(studentId, name, email, phone, idCard, math,physics,chemistry);

  axios({
    url: "http://svcy.myclass.vn/api/SinhVien/ThemSinhVien",
    method: "POST",
    data: newStudent,
  })
    .then((res) => {
      //fetch danh sách student mới
      fetchStudents();
    })
    .catch((err) => {
      console.log(err);
    });
};

// Function 4 : thêm sinh viên
const deleteStudent = (id) => {
  axios({
    url: `http://svcy.myclass.vn/api/SinhVien/XoaSinhVien/${id}`,
    method: "DELETE",
  })
    .then((res) => {
      console.log(res);
      fetchStudents();
    })
    .catch((err) => {
      console.log(err);
    });
};

// Function 5 : lấy thông tin sinh viên muốn cập nhật và show lên form
const getStudent = (id) => {
  axios({
    url: `http://svcy.myclass.vn/api/SinhVien/LayThongTinSinhVien/${id}`,
    method: "GET",
  })
    .then((res) => {
      console.log(res);
      document.getElementById("btnThem").click();

      const studentId = document.getElementById("id").value = res.data.MaSV;
      const name = document.getElementById("name").value = res.data.HoTen;
      const email = document.getElementById("email").value = res.data.Email;
      const phone = document.getElementById("phone").value = res.data.SoDT;
      const idCard = document.getElementById("idCard").value = res.data.CMND;
      const math = document.getElementById("math").value = res.data.DiemToan;
      const physics = document.getElementById("physics").value = res.data.DiemLy;
      const chemistry = document.getElementById("chemistry").value = res.data.DiemHoa;

      document.getElementById("id").setAttribute("disabled", true);

    })
    .catch((err) => {
      console.log(err);
    });
};

// Function 6 : cập nhật thông tin sinh viên
const updateStudent = () => {
  const studentId = document.getElementById("id").value;
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const idCard = document.getElementById("idCard").value;
  const math = document.getElementById("math").value;
  const physics = document.getElementById("physics").value;
  const chemistry = document.getElementById("chemistry").value;

  const updatedStudent = new Student(studentId, name, email, phone, idCard, math,physics,chemistry);

  axios({
    url: "http://svcy.myclass.vn/api/SinhVien/CapNhatThongTinSinhVien",
    method: "PUT",
    data: updatedStudent,
  })
    .then((res) => {
      // clear form
      // document.getElementById("btnReset").click();

      // close form
      document.getElementById("btnClose").click();

      // mở khóa ô input id
      // document.getElementById("id").removeAttribute("disabled");
      
      //fetch danh sách student mới
      fetchStudents();
    })
    .catch((err) => {
      console.log(err);
    });
}

// mở khóa ô input id
document.getElementById("btnThem").addEventListener("click", () => {
  document.getElementById("id").removeAttribute("disabled");
})

fetchStudents();
