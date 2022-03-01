import {useEffect, useState} from "react";

export const SearchPanel = () => {
  // 项目名
  const [param, setParam] = useState({
    name: "",
    personId: ""
  })
  // 项目负责人
  const [users, setUsers] = useState([])
  // 查询的数据列表
  const [list, setList] = useState([])
  // 查询数据
  useEffect(() => {
    fetch("").then(async resp => {
      if (resp.ok) {
        setList(await resp.json())
      }
    })

  }, [param])

  return  <form>
    <div>
      <input type="text" placeholder={"项目名"} value={param.name} onChange={evt => setParam({
        ...param,
        name: evt.target.value
      })}/>
      <select value={param.personId} onChange={evt => setParam({
        ...param,
        personId: evt.target.value
      })}>
        <option value={""}>负责人</option>
        {
          users.map(user => <option value={user.id}>user.name</option>)
        }
      </select>
    </div>
  </form>
}
