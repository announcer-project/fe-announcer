import Header from "../../components/Howto/Header";
function Chatbot() {
  return (
    <div>
      <Header />
      <div className="container py-4">
        <b>วิธีใช้ แชทบอท</b>
        <p>
          คุณสามารถพิมพ์ชื่อของประเภทข่าวในช่องแชทได้ เพื่อรับข่าวสารประเภทนั้นๆ
        </p>
        <b>ภาพประกอบ</b>
        <div>
          1.พิมพ์ชื่อของประเภทข่าว
          <img className="w-100" src="/img/howto/chatbot_1.png"/>
          2.แชทบอทส่งข่าวสารประเภทนั้นมาให้
          <img className="w-100 mt-2" src="/img/howto/chatbot_2.png"/>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
