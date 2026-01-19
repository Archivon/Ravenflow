using Microsoft.UI.Xaml.Controls;

using RavenFlow.ViewModels;

namespace RavenFlow.Views;

public sealed partial class RavenFlowPage : Page
{
    public RavenFlowViewModel ViewModel
    {
        get;
    }

    public RavenFlowPage()
    {
        ViewModel = App.GetService<RavenFlowViewModel>();
        InitializeComponent();
    }
}
