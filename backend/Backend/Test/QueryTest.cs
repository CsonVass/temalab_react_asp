using Canban.DAL;
using Canban.BL;
using System;
using System.Threading.Tasks;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System.Collections.Generic;

namespace Test
{
    [TestClass]
    public class QueryTest
    {
        [TestMethod]
        public async Task TestDeleteNonExistingColumn()
        {
            var columnRepositoryMock = new Mock<IColumnRepository>();
            columnRepositoryMock.Setup(repo => repo.GetColumnOrNull(It.IsAny<int>())).ReturnsAsync((Column)null);

            var todoItemRepositoryMock = new Mock<ITodoItemRepository>();

            var cm = new CanbanManager(columnRepositoryMock.Object, todoItemRepositoryMock.Object);

            Assert.IsFalse(await cm.TryDeleteColumn(1000));
        }

        [TestMethod]
        //[ExpectedException(typeof(InvalidOperationException))]
        public async Task TestDeleteNonExistingTodoItem()
        {
            var columnRepositoryMock = new Mock<IColumnRepository>();

            var todoItemRepositoryMock = new Mock<ITodoItemRepository>();
            todoItemRepositoryMock.Setup(repo => repo.GetTodoItemOrNull(It.IsAny<int>())).ReturnsAsync((TodoItem)null);

            var cm = new CanbanManager(columnRepositoryMock.Object, todoItemRepositoryMock.Object);

            Assert.IsFalse(await cm.TryDeleteTodoItem(1000));
        }

        [TestMethod]
        public async Task TestUpdateNonExistingColumn()
        {
            var columnRepositoryMock = new Mock<IColumnRepository>();
            columnRepositoryMock.Setup(repo => repo.GetColumnOrNull(It.IsAny<int>())).ReturnsAsync((Column)null);

            var todoItemRepositoryMock = new Mock<ITodoItemRepository>();

            var cm = new CanbanManager(columnRepositoryMock.Object, todoItemRepositoryMock.Object);

            Assert.IsFalse(await cm.TryUpdateColumn(new Column { ID=1000}));
        }

        [TestMethod]
        //[ExpectedException(typeof(InvalidOperationException))]
        public async Task TestUpdateNonExistingTodoItem()
        {
            var columnRepositoryMock = new Mock<IColumnRepository>();

            var todoItemRepositoryMock = new Mock<ITodoItemRepository>();
            todoItemRepositoryMock.Setup(repo => repo.GetTodoItemOrNull(It.IsAny<int>())).ReturnsAsync((TodoItem)null);

            var cm = new CanbanManager(columnRepositoryMock.Object, todoItemRepositoryMock.Object);

            Assert.IsFalse(await cm.TryUpdateTodoItem(new TodoItem { ID = 1000 }));
        }
    }
}
