// author repository: https://t.me/CatStudyCase


{
  "always_run_in_app" : false,
  "icon" : {
    "color" : "yellow",
    "glyph" : "magic"
  },
  "name" : "Celluar_INFO",
  "script" : "const w = new ListWidget()\nconst DynamicText = Color.dynamic(new Color('#111111'), new Color('#ffffff'))\nw.backgroundColor = Color.dynamic(new Color('#ffffff'), new Color('#1c1c1e'))\n\n\nasync function Run(){\n  let Wsize=-1\n  if(!getdata('LimitVal')) setdata('LimitVal', '')\n  if(!getdata('unLimitVal')) setdata('unLimitVal', '')\n\n  if (config.runsInApp) {\n    let al = new Alert()\n    al.title = '余量信息'\n    al.message = '请在相关设置选择数据来源'\n    al.addAction('更新脚本') \/\/0\n    al.addAction('相关设置') \/\/1\n    al.addAction('预览组件') \/\/2\n    al.addAction('刷新桌面小组件') \/\/3\n    al.addCancelAction('取消') \/\/-1\n\n\n    let UserCh = await al.presentSheet()\n    if (UserCh == -1) {}\n    if (UserCh == 0) {\n      await AsyncJs()\n      let al = new Alert()\n      al.message = '更新脚本完成，退出后生效'\n      al.addAction('完成')\n      await al.present()\n    }\n    if (UserCh == 1) {\/\/相关设置\n      let a1 = new Alert()\n      a1.title = '相关设置'\n      a1.message='间距与数据相关设置'\n      a1.addAction('数据来源')\n      a1.addAction('自定义余量')\n      a1.addAction('组件间距设置')\n      a1.addDestructiveAction('清除缓存')\n      a1.addCancelAction('取消')\n      let ch=await a1.presentAlert()\n      if(ch==0){\/\/数据来源\n        let a2=new Alert()\n        a2.title = '数据来源'\n        a2.addAction('从BoxJS获取-电信')\n        a2.addAction('从BoxJS获取-联通')\n        a2.addCancelAction('取消')\n        let ch=await a2.presentAlert()\n        if(ch==-1) {}\n        if(ch==0) {\n          setdata('isData', '1')\n          Wsize=1\n        }\n        if(ch==1) {\n          setdata('isData', '2')\n          Wsize=1\n        }\n\n      }\n      if(ch==1){\/\/通用与定向数据自定义\n        let a2=new Alert()\n        a2.message=`通用与定向数据自定义\\n不填写为默认空\\n单位GB`\n        a2.addTextField('通用总量',getdata('LimitVal')||'')\n        a2.addTextField('定向总量',getdata('unLimitVal')||'')\n        a2.addAction('确认')\n        a2.addCancelAction('取消')\n        await a2.presentAlert()\n        let val=a2.textFieldValue(0)\n        let val1=a2.textFieldValue(1)\n        setdata('LimitVal', String(val))\n        setdata('unLimitVal', String(val1))\n\n      }\n      if(ch==2){\/\/组件间距设置\n\t    let a2=new Alert() \n\t    a2.title='组件间距设置'\n\t    a2.message=`柱状图单次减少量为0.1`\n\t    a2.addTextField('组件间隔 默认值50' , getdata('Space')||'')\n\t    a2.addTextField('柱状图间隔 默认值2', getdata('KSize')||'')\n      a2.addTextField('左边距 默认值5', getdata('Left_Padding')||'')\n      a2.addDestructiveAction('全部恢复默认值')\n\t    a2.addAction('确认')\n\t    a2.addCancelAction('取消')\n        let ch = await a2.presentAlert()\n        if(ch==0){\n          rmdata('Space');\n          rmdata('KSize');\n          rmdata('Left_Padding');\n        }else if(ch == 1){\n          let Space = a2.textFieldValue(0)\n          let KSize = a2.textFieldValue(1)\n          let Left_Padding = a2.textFieldValue(2)\n          setdata('Space', String(Space))\n          setdata('KSize', String(KSize))\n          setdata('Left_Padding', String(Left_Padding))\n          Wsize = 1\n        }\n\n      }\n      if(ch==3){\n\t    let a2=new Alert() \n\t    a2.message=`清除上版本缓存，当组件存在问题时可清理`\n         a2.addAction('确认')\n         a2.addCancelAction('取消')\n        let ch=await a2.presentAlert()\n        if(ch==0){ClearData()}\n      }\n    }\n    if (UserCh == 2) {\/\/预览类型\n      let a1 = new Alert()\n      a1.title = '预览类型'\n      a1.addAction('小组件')\n      a1.addAction('中等组件')\n      a1.addCancelAction('取消')\n      Wsize = await a1.presentAlert()\n    }\n    if(UserCh==3){\n      let al = new Alert()\n      al.message = '刷新完成'\n      al.addAction('完成')\n      await al.present()\n    }\n  }\n\n  let str='数据流量-通用'\n  let str1 ='数据流量-定向'\n  Query=await BoxJsData()\n\n  processData(Query)\n\n  if (config.widgetFamily == 'small' || Wsize == 0) {\n    generateSmallWidget(str ,str1, w ,Query)\n    if (Wsize == 0) { w.presentSmall() }\n  }\n  if (config.widgetFamily == 'medium' || Wsize == 1) {\n\n    const rowSpacing = 10; \/\/ 设置行间距\n    const leftPadding = Number(getdata('Left_Padding'))|| 5; \/\/ 设置左边距\n    const LimtUnlimitPadding=  Number(getdata('Space'))|| 50; \/\/设置第一行通用与定向间距\n\n    generateMediumWidget(Query ,str ,str1 ,w ,rowSpacing ,leftPadding ,LimtUnlimitPadding)\n    if (Wsize == 1) { w.presentMedium() }\n  }\n\n}\n\nawait Run()\nScript.setWidget(w)\nScript.complete()  \n\nfunction ClearData(){\n  for(i=0;i<48;++i)rmdata(String(i))\n  rmdata('LimitVal')\n  rmdata('unLimitVal')\n  rmdata('Space')\n  rmdata('KSize')\n  rmdata('Left_Padding')\n  rmdata('Hours')\n}\n\nasync function AsyncJs(){\n  let fm = FileManager.local();\n  if (fm.isFileStoredIniCloud(module.filename)) {\n    fm = FileManager.iCloud();\n  }\n  const url = 'https:\/\/raw.githubusercontent.com\/LitPrompt\/Module\/main\/Scriptable\/Telecom_Script.js';\n  const request = new Request(url);\n  try {\n    const code = await request.loadString();\n    fm.writeString(module.filename, code);\n    const alert = new Alert();\n    alert.message = '代码已更新,关闭生效。';\n    \/\/ alert.addAction('确定');\n    \/\/ alert.presentAlert();\n  } catch (e) {\n    console.error(e);\n  }\n}\n\nfunction processData(Query) {\n  let Hours = new Date().getHours(); \/\/获取小时\t\n  if (!getdata('Hours')) setdata('Hours', String(Hours));\n  LastTime = Hours == 0 ?  47 : Hours + 24 - 1;\n\n  for (Hours == 0 ? i = 1 : i = 0; i <= 23 && (!getdata(String(i)) || Hours == 0); i++) { \/\/数据初始化\n    let First = { unlimitchange: 0, limitchange: 0 };\n    setdata(String(i), JSON.stringify(First));\n  }\n  for (i = 24; i <= 47 && !getdata(String(i)); i++) { \/\/数据初始化\t\n    let First = { unlimitusage: 0, limitusage: 0 };\n    setdata(String(i), JSON.stringify(First));\n  }\n\n  if (getdata('Hours') != String(Hours)) {\n    setdata('Hours', String(Hours));\n    let Usage={\n      limitusage : Query.LimitUsage,\n      unlimitusage : Query.UNLimitUsage\n    }\n    setdata(String(Hours + 24), JSON.stringify(Usage)); \/\/将就数据存入24-47中\t\n  }\n\n  let LastLimit = getobjdata(String(LastTime)).limitusage;\n  let LastUnlimit = getobjdata(String(LastTime)).unlimitusage;\n  let Change = {\n    unlimitchange: Query.UNLimitUsage - LastUnlimit,\n    limitchange: Query.LimitUsage - LastLimit\n  };\n  setdata(String(Hours), JSON.stringify(Change)); \/\/将变化量存入0~23中\n}\n\nfunction generateSmallWidget(str ,str1, Widget ,Query){\n  const container = Widget.addStack();\n  container.layoutVertically();\n  container.centerAlignContent();\n\n  const upStack = container.addStack();\n  generateModule(upStack,str,Query.LimitUsage, Query.LimitAll)\n  container.addSpacer(10);\n  const downStack = container.addStack();\n  generateModule(downStack,str1,Query.UNLimitUsage, Query.UNLimitAll)\n}\n\nfunction generateMediumWidget(Query ,str ,str1 ,Widget ,rowSpacing ,leftPadding ,LimtUnlimitPadding){\n  \n  let column = Widget.addStack()\n  column.layoutVertically()\n\n\n  let row =column.addStack();\n  row.addSpacer(leftPadding+10)\n\n  column.addSpacer(rowSpacing); \/\/ 在 row2 添加垂直间距\n\n  let row2 = column.addStack()\n  row2.addSpacer(leftPadding)\n\n  column.addSpacer(rowSpacing); \/\/ 在 row3 添加垂直间距\n\n  let row3 = column.addStack()\n  row3.addSpacer(leftPadding)\n\n  const container = row.addStack();\n  container.layoutHorizontally();\n  container.centerAlignContent();\n\n  const leftStack = container.addStack();\n  generateModule(leftStack,str,Query.LimitUsage, Query.LimitAll)\n\n  container.addSpacer(LimtUnlimitPadding);\n\n  const rightStack = container.addStack();\n  generateModule(rightStack,str1,Query.UNLimitUsage, Query.UNLimitAll)\n\n\n  const canvasWidth = 10;\n  const canvasHeight = 40;\n\n  for (let i = 0; i <= 23; i++) {\n    let columnImgStack = row3.addStack()\n    columnImgStack.layoutVertically()\n    const iconImg = columnImgStack.addImage(HourKline(getobjdata(String(i)).limitchange, getobjdata(String(i)).unlimitchange, i,canvasWidth ,canvasHeight))\n    iconImg.imageSize = new Size(canvasWidth, canvasHeight);\n    \/\/ 在指定时间下方绘制时间数字\n    if (i === 0 || i === 6 || i === 12 || i === 18 || i === 23) {\n      let timeText=columnImgStack.addText(i.toString().padStart(2, '0'))\n      timeText.font = Font.mediumSystemFont(9)\n      timeText.textColor= DynamicText\n    }\n    row3.addSpacer(Number(getdata('KSize'))||2);\n  }\n\n\n}\n\nfunction generateModule(Widget,str,usage, total) {\n\n  Widget.setPadding(0, 0, 0, 15);\n\n  const column = Widget.addStack()\n  column.layoutVertically()\n\n  let titleRow= column.addStack()\n  titleRow.layoutHorizontally()\n  let title = titleRow.addText(str)\n  title.textColor = DynamicText\n  title.font = Font.boldSystemFont(9)\n\n  column.addSpacer(2)\n\n  let valRow = column.addStack()\n  \/\/ valRow.layoutHorizontally()\n  const iconImg = valRow.addImage(UsageBar(usage, total))\n  iconImg.imageSize = new Size(7, 42)\n  valRow.addSpacer(5)\/\/图片与文字距离\n  let valRowLine = valRow.addStack()\n  valRowLine.layoutVertically()\n  const usageText = valRowLine.addText(String(ToSize(usage, 1, 1, 1)))\n  const totalText = valRowLine.addText(total==0? '无限 ':String(ToSize(total, 1, 0, 1)) + '(' + (usage \/ total * 100).toFixed(0) + '%)')\n  usageText.font = Font.mediumMonospacedSystemFont(20)\n  totalText.font = Font.mediumRoundedSystemFont(15)\n  usageText.textColor = DynamicText\n  totalText.textColor = DynamicText\n\n}\n\n\/**\n * \n * @param {*} total 总量\n * @param {*} haveGone 使用量\n * @returns \n *\/\nfunction UsageBar(haveGone, total) {\n  const canvasWidth = 7;\n  const canvasHeight = 40;\n  const barCornerRadius = {x: 8 ,y: 2 };\n\n  \/\/ 创建DrawContext实例，并设置画布大小\n  const context = new DrawContext();\n  context.size = new Size(canvasWidth, canvasHeight)\/\/画布宽高\n  context.respectScreenScale = true;\n  context.opaque = false; \/\/ 设置为透明背景\n\n  \/\/ 创建柱状图剩余路径\n  const bgPath = new Path();\n  bgPath.addRoundedRect(new Rect(0, 0, canvasWidth, canvasHeight), barCornerRadius.x, barCornerRadius.y);\n  context.addPath(bgPath);\n  context.setFillColor(new Color(\"#4d4d4d\"));\n  context.fillPath();\n\n  \/\/ 创建柱状图用量路径\n  const barPath = new Path();\n  const barHeight = ((total-haveGone) \/ total) * canvasHeight;\n  const barRect = new Rect(0, canvasHeight - barHeight , canvasWidth, barHeight);\n  barPath.addRoundedRect(barRect, barCornerRadius.x, barCornerRadius.y);\n  context.addPath(barPath);\n  context.setFillColor(new Color(\"#1785ff\")); \/\/ 填充蓝色\n  context.fillPath();\n\n  const Image = context.getImage(); \/\/ 获取绘制的图像\n\n  return Image;\n}\n\n\/**\n * \n * @param {*} limit 通用用量\n * @param {*} unlimit 定向用量\n * @param {*} t 时间\n * @returns image\n *\/\nfunction HourKline(limit, unlimit, t ,width ,height) {\n\n  let All = limit + unlimit\n\n  if (All >= 0 && All <= 10240) ThereShold = 10240\/\/10MB\n  if (All > 10240 && All <= 102400) ThereShold = 102400\/\/100MB\n  if (All > 102400 && All <= 512000) ThereShold = 512000\/\/500MB\n  if (All > 512000 && All <= 1048576) ThereShold = 1048576\/\/1GB\n  if (All > 1048576 && All <= 5242880) ThereShold = 5242880\/\/5GB\n  if (All > 5242880 && All <= 20971520) ThereShold = 20971520\/\/20GB\n  if (All > 20971520) ThereShold = 1048576000\/\/100GB\n\n  const context = new DrawContext()\/\/创建图形画布\n  context.opaque = false; \/\/ 设置为透明背景\n  context.size = new Size(width, height)\n  context.respectScreenScale = true\n\n  if (t == 0 || t == 6 || t == 12 || t == 18 || t == 23) Width = 0.4\n  else Width = 0.1\n\n  const bgColor = new Color(\"#4d4d4d\"); \/\/ 线条为浅灰色\n  \/\/ 创建柱状图线条\n  const bgPath = new Path();\n  bgPath.addRoundedRect(new Rect(width \/ 2, 0, Width, height), 0, 0);\n  context.addPath(bgPath);\n  context.setFillColor(bgColor);\n  context.fillPath();\n\n\n  \/\/ 创建柱状图用量路径\n  const barPath = new Path();\n  const limitbarHeight = height * limit \/ ThereShold\n  const unlimitbarHeight = height * unlimit \/ ThereShold\n\n  const barlimitRect = new Rect(0, height - limitbarHeight-unlimitbarHeight, width, limitbarHeight);\n  const barunlimitRect = new Rect(0, height- unlimitbarHeight, width, unlimitbarHeight);\n  barPath.addRoundedRect(barlimitRect, 0, 0);\n  barPath.addRoundedRect(barunlimitRect, 0, 0);\n\n  \/\/ 设置不同的填充颜色\n  context.setFillColor(new Color(\"#fe708b\")); \/\/ 设置limit部分的填充颜色\n  context.fill(barlimitRect);\n\n  context.setFillColor(new Color(\"#8676ff\")); \/\/ 设置unlimit部分的填充颜色\n  context.fill(barunlimitRect);\n\n  return context.getImage()\n}\n\nfunction ToSize(kbyte, s, l, t) {\n  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];\n  let size = kbyte * 1024; \/\/ 将输入的千字节转换为字节\n\n  \/\/ 计算单位的指数\n  let unitIndex = 0;\n  while (size >= 1024 && unitIndex < units.length - 1) {\n    size \/= 1024;\n    unitIndex++;\n  }\n\n  \/\/ 格式化大小字符串\n  let formattedSize = size.toFixed(s);\n  if (l > 0) {\n    formattedSize = formattedSize.padEnd(formattedSize.length + l, ' ');\n  }\n\n  \/\/ 添加单位\n  if (t === 1) {\n    formattedSize += units[unitIndex];\n  }\n\n  return formattedSize;\n}\n\n\nasync function BoxJsData() {\n  console.log('BoxJS获取数据')\n  let url\n   if(getdata('isData')== '1'){\n      url = 'http:\/\/boxjs.com\/query\/data\/PackgeDetail'\n   }\n    if(getdata('isData')=='2'){\n      url = 'http:\/\/boxjs.com\/query\/data\/@ChinaUnicom.10010v4.vars'\n    }\n  console.log(url)\n\n  let data = null\n  try {\n    let SetVal = Number(getdata('LimitVal'))\n    let SetVal1 = Number(getdata('unLimitVal'))\n\n    let req = new Request(url)\n    data = await (req.loadJSON())\n    if(SetVal != '') SetVal *= 1048576\n    if(SetVal1 != '') SetVal1 *=1048579\n\n    if(getdata('isData')=='1'){\n\n      ArrayQuery = JSON.parse(data.val)\n\n      BillLeft = ArrayQuery.balanceInfo.balance||null,\/\/[话剩]\n      BillUsed = ArrayQuery.balanceInfo.used || null,\/\/[话用]\n      AllLimitUse = ArrayQuery.flowInfo.commonFlow.used,\/\/ '[通用]'\n      AllLimitLeft = ArrayQuery.flowInfo.commonFlow.balance,\/\/ '[通剩]'\n      AllLimit =  SetVal|| ArrayQuery.flowInfo.commonFlow.total ,\/\/ '[通总]'\n      AllUnlimitUse = ArrayQuery.flowInfo.specialAmount.used,\/\/ '[定用]'\n      AllUnlimitLeft = ArrayQuery.flowInfo.specialAmount.balance,\/\/ '[定剩]'\n      AllUnlimit =  SetVal1|| ArrayQuery.flowInfo.specialAmount.total,\/\/ '[定总]'\n      AllVoiceUsed = ArrayQuery.voiceInfo.used || null,\/\/[语用]\n      AllVoiceLeft = ArrayQuery.voiceInfo.balance|| null\/\/[语剩]\n\n\n    }    \n    if(getdata('isData')=='2'){\n      rawData=JSON.parse(data.val)\n\n      AllVoiceUsed = ''\n      AllVoiceLeft = ''\n      BillUsed = ''\n      BillLeft = ''\n      AllUnlimitUse=(rawData['[所有免流.已用].raw'])*1024\n      AllUnlimitLeft= (rawData['[所有免流.剩余].raw'])*1024\n      AllUnlimit =SetVal1 || rawData['[所有免流.总].raw'] *1024\n\n  \n      AllLimitUse=(rawData['[所有通用.已用].raw'])*1024\n      AllLimitLeft=(rawData['[所有通用.剩余].raw'])*1024\n      AllLimit= SetVal || rawData['[所有通用.总].raw'] *1024\n\n      console.log(AllLimit+' '+AllLimitLeft+' '+AllLimitUse+`\\n`+AllUnlimit+' '+AllUnlimitLeft+' '+AllUnlimitUse);\n      \n    }\n  } catch (e) { \n    console.error(e);\n  }\n  \n  let Queryinfo = { \n    UNLimitAll: AllUnlimit, \n    UNLimitLeft: AllUnlimitLeft, \n    UNLimitUsage: AllUnlimitUse, \n\n    LimitAll: AllLimit, \n    LimitLeft: AllLimitLeft, \n    LimitUsage: AllLimitUse ,\n\n    VoiceBill: {used:AllVoiceUsed,left:AllVoiceLeft},\n    VoiceDataBill: {used:BillUsed,left:BillLeft}\n  }\n\n  console.log(Queryinfo);\n\n  return Queryinfo\n}\n\nasync function getImage(url) {\n  const request = new Request(url);\n  const image = await request.loadImage();\n  return image\n}\n\nfunction setdata(Key, Val) {Keychain.set(Key, Val);}\nfunction getdata(Key) {\n  if(Keychain.contains(Key))return Keychain.get(Key) \n  else return false\n}\nfunction getobjdata(Key) { return JSON.parse(Keychain.get(Key)) }\nfunction rmdata(Key) { Keychain.remove(Key)}\n",
  "share_sheet_inputs" : [

  ]
}