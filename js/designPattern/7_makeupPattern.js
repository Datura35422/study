// 组合模式
// 好处是通过对象的多态性表现，使得用户对单个对象和组合对象的使用具有一致性。
// 1.表示属性结构。提供可一种遍历属性结构的方案，组合模式可以非常方便的描述对象部分-整体层次结构。
// 2.利用对象多态性同意对待组合对象和单个对象。
// 缺点：代码难以理解。如果通过组合模式穿件了太多的对象，那么对象可能会让系统负担不起。

// 请求在树中传递的过程
// 如果子节点是叶对象，叶对象自身会处理这个请求，而如果子节点还是组合对象，请求会继续往下传递。
// 请求从上到下沿着树进行传递，直到树的尽头。

// 注意：
// 1.组合模式不是父子关系
// 2.对叶对象操作的一致性
// 3.双向映射关系
// 4.用职责链模式提高组合模式性能。让请求顺着链条从父对象往子对象传递，或者是反过来从子对象往父对象传递，知道遇到可以处理该请求的对象位置，者也是职责链模式的经典运用场景之一。

// 何时使用
// 1.表示对象的部分-整体层次结构。
// 客户希望统一对待树中的所有对象。

// 例子：扫描文件夹
// 文件夹和文件之间的关系，非常适合用组合模式来描述。文件夹里既可以包含文件，又可以
// 包含其他文件夹，最终可能组合成一棵树，组合模式在文件夹的应用中有以下两层好处。
//  例如，我在同事的移动硬盘里找到了一些电子书，想把它们复制到 F 盘中的学习资料文
// 件夹。在复制这些电子书的时候，我并不需要考虑这批文件的类型，不管它们是单独的
// 电子书还是被放在了文件夹中。组合模式让 Ctrl+V、Ctrl+C 成为了一个统一的操作。
//  当我用杀毒软件扫描该文件夹时，往往不会关心里面有多少文件和子文件夹，组合模式
// 使得我们只需要操作最外层的文件夹进行扫描。
// 现在我们来编写代码，首先分别定义好文件夹 Folder 和文件 File 这两个类。
/************************ Folder *********************/
var Folder = function(name) {
  this.name = name
  this.files = []
}

Folder.prototype.add = function(file) {
  this.file.push(file)
}
Folder.prototype.scan = function() {
  console.log('开始扫描文件夹:' + this.name)
  for (var i = 0, file, files = this.files; file = files[i++];) {
    file.scan()
  }
}

/*************************** File ************************/
var File = function(name){
  this.name = name
}
File.prototype.add = function() {
  throw new Error('文件下面不能再添加文件')
}
File.prototype.scan = function() {
  console.log('开始扫描文件：' + this.name)
}
// 接下来创建一些文件夹和文件对象，并且让他们组合成一棵树，这棵树就是F盘里的现有文件目录结构
var folder = new Folder('学习资料')
var folder1 = new Folder('JavaScript')
var folder2 = new Folder('jQuery')

var file1 = new File('JavaScript设计模式与开发实践')
var file2 = new File('精通jQuery')
var file3 = new File('重构与模式')

folder1.add(file1)
folder2.add(file2)

folder.add(folder1)
folder.add(folder2)
folder.add(file3)

// 现在的需求是把移动硬盘里的文件和文件夹都复制到这棵树中，假设我们已经得到了这些文件对象
var folder3 = new Folder('Nodejs')
var file4 = new File('深入浅出Node.js')
folder3.add(file4)

var file5 = new File('JavaScript语言精髓与编程实践')

// 接下来把直接这些文件都添加到原有的树中
folder.add(folder3)
folder.add(file5)

// 扫描整个文件夹
folder.scan()