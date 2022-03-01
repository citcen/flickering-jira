import {useEffect, useState} from "react";

export const SearchPanel = () => {
  // ��Ŀ��
  const [param, setParam] = useState({
    name: "",
    personId: ""
  })
  // ��Ŀ������
  const [users, setUsers] = useState([])
  // ��ѯ�������б�
  const [list, setList] = useState([])
  // ��ѯ����
  useEffect(() => {
    fetch("").then(async resp => {
      if (resp.ok) {
        setList(await resp.json())
      }
    })

  }, [param])

  return  <form>
    <div>
      <input type="text" placeholder={"��Ŀ��"} value={param.name} onChange={evt => setParam({
        ...param,
        name: evt.target.value
      })}/>
      <select value={param.personId} onChange={evt => setParam({
        ...param,
        personId: evt.target.value
      })}>
        <option value={""}>������</option>
        {
          users.map(user => <option value={user.id}>user.name</option>)
        }
      </select>
    </div>
  </form>
}
