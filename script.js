var LENGHT=0
var node = { el: undefined, ar: [] }
node.el = document.querySelector(".bt-root")

document.querySelector(".bt-root").style.top = "50px"
document.querySelector(".bt-root").style.left = `${2000/2}px`

var isCntrDown = false
document.addEventListener('keydown', (e) => isCntrDown = e.key == "Control")
document.addEventListener('keyup', (e) => isCntrDown = !e.key == "Control")
document.addEventListener('click', (e) => isCntrDown && focusNode && createNode(e))

var focusNode
document.querySelectorAll("textarea").forEach(i => { i.onclick = () => { focusNode = i } })

var canvas = document.getElementById('myCanvas')
var ctx = canvas.getContext('2d');

function createNode(e) {

    let newNode = document.createElement("textarea")
    newNode.classList.add("bt-left")
    newNode.style.top = `${e.pageY}px`
    newNode.style.left = `${e.pageX}px`
    document.body.appendChild(newNode)

    drow(PixelStingToInt(focusNode.style.left),
        PixelStingToInt(focusNode.style.top),
        e.pageX, e.pageY, 'green', 3)

    setItemInTree(node, { el: newNode, ar: [] })
    //console.log(node);

    document.querySelectorAll("textarea").forEach(i => {
        i.onclick = () => {
            focusNode = i
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drowBlackLine(node)
            LENGHT=0
            serchRoute(node, i)
        }
    })
}

function serchRoute(position, Item) {
    if (position.el == Item) {
        return position
    }
    for (let i = 0; i < position.ar.length; i++) {
        if (position.ar[i].ar != undefined) {
            let positionRet = serchRoute(position.ar[i], Item)
            if (positionRet != undefined) {
                LENGHT++;
                document.querySelector("#TextCount").textContent=`Відстань від кореня до вашої точки  ${LENGHT}`
                drow(PixelStingToInt(positionRet.el.style.left),
                    PixelStingToInt(positionRet.el.style.top),
                    PixelStingToInt(position.el.style.left),
                    PixelStingToInt(position.el.style.top),
                    'red', 3)
                    return position
            }
        }
    }return undefined
}

function drowBlackLine(node) {   
    for (let i = 0; i < node.ar.length; i++) {               
        drow(PixelStingToInt(node.el.style.left),
            PixelStingToInt(node.el.style.top),
            PixelStingToInt(node.ar[i].el.style.left),
            PixelStingToInt(node.ar[i].el.style.top),
            'green', 3)
        if (node.ar[i].ar != undefined) {
            drowBlackLine(node.ar[i])
        }
    }
}

function drow(x1, y1, x2, y2, strokeS, lineW) {
    console.log(x1+"-"+y1+"-"+x2+"-"+y2);
    ctx.strokeStyle = strokeS;
    ctx.lineWidth = lineW;
    ctx.beginPath();
    ctx.moveTo(x1 + 20, y1);
    ctx.lineTo(x2 + 20, y2);
    ctx.closePath();
    ctx.stroke();
}

function setItemInTree(position, Item) {
    if (position.el == focusNode) {
        position.ar.push(Item)
    } else {
        for (let i = 0; i < position.ar.length; i++) {
            if (position.ar[i].ar != undefined) {
                setItemInTree(position.ar[i], Item)
            }
        }
    }
}

function PixelStingToInt(sPixel) {
    return Math.round(+sPixel.substring(0, sPixel.length - 2))
}