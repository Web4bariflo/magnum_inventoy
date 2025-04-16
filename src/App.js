import "./App.css";
import Home from "./pages/Home";
import Layout from "./layout/layout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import Auth from "./pages/Auth";
import store from "./redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { Provider } from "react-redux";
import { fetchSidebar } from "./redux/reducer/sidebardata";
import { useEffect, useState } from "react";
import DynamicForm from "./pages/DynamicForm";
import "react-toastify/dist/ReactToastify.css";
import "./style/style.css";
import ManageCategories from "./pages/category/ManageCategories";
import ManageProducts from "./pages/products/ManageProducts";
import Error404Page from "./pages/Error404Page";
import ManageWarhouse from "./pages/warehouse/ManageWarehouse";
import ManageUsers from "./pages/users/ManageUsers";
import CreatePurchaseOrder from "./pages/purchaseorder/CreatePurchaseOrder";
import ManagePurchaseOrder from "./pages/purchaseorder/ManagePurchaseOrder";
import AddStock from "./pages/expoterside/AddStock";
import StockIn from "./pages/expoterside/StockIn";
import StockOut from "./pages/expoterside/StockOut";
import DistributorForm from "./pages/expoterside/DistributorForm";
import StockTransaction from "./pages/expoterside/StockTransaction";
import DistStockIn from "./pages/distributorside/page/DistStockIn";
import DistStockout from "./pages/distributorside/page/DistStockout";
import DistStockTransaction from "./pages/distributorside/page/DistStockTransaction"
import StockForm from "./pages/distributorside/StockForm"
import AddFarmer from "./pages/distributorside/AddFarmer";
import Dashboard from "../src/components/Dashboard/Dashboard"
import Farmer from "./pages/farmer/Farmer";
import Barcode from "./pages/expoterside/GenerateBarcode"
import ManageExporter from "./pages/exporter/ManageExporter";
import HomeRedirect from "./utils/HomeRedirect";

function App() {
  const { status, error, items } = useSelector((state) => state.sidebardata);
  // const { isLoggedIn } = useSelector((state) => state.isLoggedInReducer);
  const dispatch = useDispatch();
  // console.log(items)
  const role = localStorage.getItem("role");

  useEffect(() => {
    if ( status === "idle") {
      dispatch(fetchSidebar());
    }
  }, [status, dispatch]);

  const router = createBrowserRouter([
    { path: "/auth", element: <Auth /> },
    {
      path: "/",
      element: <Layout sidebarList={items} pageTitle={`Hello ${role} !`}/>,
      errorElement: <Layout sidebarList={items} childPage={<Error404Page />} />,
      children: [
        { index: true, element: <HomeRedirect /> }, 
        { path: "/home", element: <ProtectedRoute element={<Dashboard />} /> },
        { path: "/dashboard", element: <ProtectedRoute element={<Dashboard />} /> },
        {
          path: "/form/:formName/:id?",
          element: <ProtectedRoute element={<DynamicForm />} />,
        },
        {
          path: "/manage/category",
          element: <ProtectedRoute element={<ManageCategories />} />,
        },
        {
          path: "/manage/product",
          element: <ProtectedRoute element={<ManageProducts />} />,
        },
        {
          path: "/manage/warehouse",
          element: <ProtectedRoute element={<ManageWarhouse />} />,
        },
        {
          path: "/manage/users",
          element: <ProtectedRoute element={<ManageUsers />} />,
        },  
        {
          path: "/manage/expoters",
          element: <ProtectedRoute element={<ManageExporter/>} />,
        }, 
        {
          path: "/create/po",
          element: <ProtectedRoute element={<CreatePurchaseOrder />} />,
        },
        {
          path: "/create/po/:id?",
          element: <ProtectedRoute element={<CreatePurchaseOrder />} />,
        },
        {
          path: "/manage/purchaseorder",
          element: <ProtectedRoute element={<ManagePurchaseOrder />} />,
        },
        {
          path: "/create/stock",
          element: <ProtectedRoute element={<AddStock/>} />,
        },  
        {
          path: "/stockin",
          element: <ProtectedRoute element={<StockIn/>} />,
        },  
        {
          path: "/stockout",
          element: <ProtectedRoute element={<StockOut/>} />,
        },  
        {
          path: "/adddistributor",
          element: <ProtectedRoute element={<DistributorForm/>} />,
        }, 
        {
          path: "/transaction",
          element: <ProtectedRoute element={<StockTransaction/>} />,
        }, 
        {
          path: "/diststockin",
          element: <ProtectedRoute element={<DistStockIn/>} />,
        }, 
        {
          path: "/diststockout",
          element: <ProtectedRoute element={<DistStockout/>} />,
        }, 
        {
          path: "/diststocktransaction",
          element: <ProtectedRoute element={<DistStockTransaction/>} />,
        }, 
        {
          path: "/distmanagestock",
          element: <ProtectedRoute element={<StockForm/>} />,
        }, 
        {
          path: "/addfarmer",
          element: <ProtectedRoute element={<AddFarmer/>} />,
        }, 
        {
          path: "/farmer",
          element: <ProtectedRoute element={<Farmer/>} />,
        },
        {
          path: "/barcode",
          element: <ProtectedRoute element={<Barcode/>} />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-right"
        theme="colored"
        autoclose={3000}
        hideProgressBar={false}
        style={{ marginBottom: "30px" }}
      />
    </>
  );
}

export default App;
